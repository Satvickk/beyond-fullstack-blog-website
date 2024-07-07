import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../../store/postSlice";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            featuredImage: post?.featuredImage || "",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData.userData);
    const dispatch = useDispatch()

    const submit = async (data) => {
        console.log(data);
    
        if (post) {
            let file = null;
            if (data.featuredImage[0]) {
                file = await appwriteService.uploadFile(data.featuredImage[0]);
                console.log("Uploaded File: ", file);
            }
    
            if (file) {
                appwriteService.deleteFile(post?.featuredImage);
            }
    
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
    
            if (dbPost) {
                dispatch(updatePost(dbPost))
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            let file = null;
            if (data.featuredImage[0]) {
                file = await appwriteService.uploadFile(data.featuredImage[0]);
                console.log("Uploaded File: ", file);
            }
    
            if (file) {
                const newData = {
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id, // Include userId here
                };
                console.log('New Data: ', newData);
                const dbPost = await appwriteService.createPost(newData);
    
                if (dbPost) {
                    dispatch(addPost(dbPost))
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                console.log("Could not upload file");
            }
        }
    };
    
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredImage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

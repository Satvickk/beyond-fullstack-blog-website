import swal from "sweetalert";
import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    console.log({ title, slug, content, featuredImage, status, userId })
    try {
      const resp = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return resp;
    } catch (error) {
      console.log("Error occured while creating Post", error);
      swal(
        "Something went wrong!",
        "Error occured while creating Post",
        "error"
      )
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const resp = this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return resp;
    } catch (error) {
      console.log("Error occured while updating Post", error);
      swal(
        "Something went wrong!",
        "Error occured while updating Post",
        "error"
      )
    }
  }

  async deletePost(slug) {
    try {
      const resp = this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.log("Error occured while deleting Post", error);
      swal(
        "Something went wrong!",
        "Error occured while deleting Post",
        "error"
      )
    }
  }

  async getPost(slug) {
    try {
      const resp = this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return resp;
    } catch (error) {
      console.log("Error occured while Fetching Post", error);
      swal(
        "Something went wrong!",
        "Error occured while Fetching Post",
        "error"
      )
      return false;
    }
  }

  async getPosts() {
    try {
      const resp = this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("status", "active")]
      );
      return resp
    } catch (error) {
        console.log("Error occured while Fetching Posts", error)
        swal(
          "Something went wrong!",
          "Error occured while Fetching Posts",
          "error"
        )
    }
  }
  
  // file upload service
  
  async uploadFile(file){
    try {
        const resp = this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
        return resp
    } catch (error) {
        console.log("Error occured while uploading file", error)
        swal(
          "Something went wrong!",
          "Error occured while uploading file",
          "error"
        )
        return false
    }
  }


  async deleteFile(fileId){
    try {
        const resp = this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log("Error occured while deleting File", error)
        swal(
          "Something went wrong!",
          "Error occured while deleting File",
          "error"
        )
    }
  }


  getFilePreview(fileId){
    const resp = this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
    return resp ? resp : "#"
  }
}

const service = new Service();

export default service;

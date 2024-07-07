// const conf = {
//     appwriteUrl: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
//     databaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
//     projectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
//     collectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
//     bucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
// }

// // console.log(conf);
// export default conf



const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf

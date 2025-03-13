import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZGdmem5qa2VsYWhzaXBxYWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjUwMzEsImV4cCI6MjA1NzQ0MTAzMX0.B5sGcTBV2LqiaxuWeZ9a7MsafnBzOAKrZGuRpJauHIE"
const supabase_url = "https://hhdgfznjkelahsipqahh.supabase.co"

const supabase = createClient(supabase_url, anon_key)

export default function mediaUpload(file){

    return new Promise ((resolve, reject)=>{
        if(file == null){
            reject("No file selected")
        }
        
        const timestamp = new Date().getTime();
        const fileName = timestamp+file.name
    
        supabase.storage.from("images").upload(fileName, file, {
            cacheControl : '3600',
            upsert : false,
        }).then(()=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl)
        }).catch(()=>{
            reject("Error uploading file")
        })
    });

}
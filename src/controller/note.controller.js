import Note from '../models/note.model.js';
import { uploadFromBuffer } from '../lib/cloudUpload.js';

export const addNote = async(req,res)=>{
    try {
        const text = req.body.text;
        const image = req.file.buffer;
        const userId = req.user.id;
        if(!text){
            return res.status(404).json({message:"Note cannot be blank !!"});
        }

        let imageUrl; 
        if(image){
        const result = await uploadFromBuffer(image);
        imageUrl = result.secure_url;
        }

        const newNote  = new Note({
            userId,
            text,
            image:imageUrl
        })
        await newNote.save();
        console.log("note :",newNote);
        res.status(200).json({message:"note added successfully",newNote});

    } catch (error) {
        console.log("error in addNote controller :",error);
        return res.status(500).json({message:"internal server error"})
    }
}

export const listNote = async (req,res)=>{
    try {
        const userId = req.user.id;
        const notes = await Note.find({userId}).sort({createdAt:-1});
        res.status(200).json({
            message:"fetched notes successfully",
            total:notes.length,
            notes
        });
    } catch (error) {
        console.log("error in listNote controller :",error);
        return res.status(500).json({message:"internal server error"})
    }
}


export const updateNoteText = async(req,res)=>{
    try {
        const noteId = req.params.id;
        const updatedNoteText = req.body.text;
        const note = await Note.findByIdAndUpdate(noteId,{text:updatedNoteText},{new:true});
        if(!note){
            return res.status(401).json({message:"Note not found"});
        }

        console.log("updated Note:",note);
        res.status(200).json({messsage:"Note is updated!!",note});
    } catch (error) {
        console.log("error in updateNote controller :",error);
        return res.status(500).json({message:"internal server error"})
    }
}

export const deleteNoteText = async(req,res)=>{
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
         if(!note){
            return res.status(404).json({message:"Note not found"});
        }

        if(note.image){
            await note.updateOne({ $unset: { text: "" } },{new:true});
            return res.status(200).json({message:"text deleted successfully"});
        }else{
            await note.deleteOne();
            return res.status(200).json({message:"text deleted successfully"});
        }
       
    } catch (error) {
        console.log("error in deleteNoteText controller :",error);
        return res.status(500).json({message:"internal server error"})
    }
}


export const deleteNoteImage = async(req,res)=>{
    try {
        const noteId = req.params.id;
        const note  = await Note.findById(noteId);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        if(note.text){
            await note.updateOne({ $unset: { image: "" } },{new:true});
            return res.status(200).json({message:"image deleted successfully"});
        }else{
            await note.deleteOne();
            return res.status(200).json({message:"image deleted successfully"});
        }
    } catch (error) {
        console.log("error in deleteNoteImage controller :",error);
        return res.status(500).json({message:"internal server error"})
    }
}




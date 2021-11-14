import NoteList from "../models/notesModel.js";

const notesCntrl = {
        
    getNoteList: async(req, res) =>{
        try {
    
            const noteList = await NoteList.find()

            res.json({
                status: 'success',
                result: noteList.length,
                noteList: noteList
            });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }, 

    createNoteList: async(req, res) =>{
        try {
            const {noteList_id, title, description} = req.body;

            const notes = await NoteList.findOne({noteList_id})
            if(notes) return res.status(400).json({msg: "this product is already exist"})

            const newNoteList = new NoteList({
                noteList_id, title, description
            })

            newNoteList.save();
            return res.json({msg: " Notes Created"});

        } catch (err){
            return res.status(500).json({msg: err.message})
        }
    }, 

    deleteNoteList: async(req, res) =>{
        try {
            await NoteList.findByIdAndDelete(req.params.id)
                res.json({msg: "Notes deleted"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }, 

    updateNoteList: async(req, res) =>{
        try {
            const {title, description} = req.body;

            await NoteList.findOneAndUpdate(
                {_id: req.params.id},
               { title, description}
                );

                res.json({msg: "Notes Updated"})
                
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    } 
}

export default notesCntrl;
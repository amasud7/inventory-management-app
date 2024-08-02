'use client'
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { firestore } from "./firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ST } from "next/dist/shared/lib/utils";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3
};

export default function Home() {

  // state variables
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pantry, setPantry] = useState([]);
  const [itemName, setItemName] = useState(""); // this is for when adding item to pantry

// updating pantry and accessing item list from Firestore database
  const updatePantry = async () => {
    const snapShot = query(collection(firestore, "pantry")); // queries database for items in pantry collection
    const docs = await getDocs(snapShot); // gets all docs from that query
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push(doc.id)
    });
    console.log(pantryList)
    setPantry(pantryList)
  }

  useEffect(() => {
    updatePantry()
  }, [])

  // add item to pantry function, accesses firebase database
  const addItem = async (item) => {
    // get colleciotn
    const docRef = doc(collection(firestore, "pantry"), item)
    await setDoc (docRef, {})
    updatePantry()
  }

  // removing item
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item)
    deleteDoc(docRef)
    updatePantry()
  }

  return <Box
    width="100vw"
    height="100vh"
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    flexDirection={"column"}
    gap={2}
  >
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField id="outlined-basic" label="Item" variant="outlined" fullWidth value={itemName} onChange={(e) => setItemName(e.target.value)}/>
              <Button variant="outlined"
                onClick={() => {
                  addItem(itemName);
                  handleClose();
                  setItemName("")
                }}
              >Add</Button>
          </Stack>
        </Box>
      </Modal>

    <Button variant="contained" onClick={handleOpen}>Add</Button>
    <Box border={"3px solid black"}>
    <Box
      width="800px"
      height="100px"
      bgcolor={"primary.main"}
      
    >
      <Typography
        variant="h2"
        color={'white'}
        textAlign={"center"}
      >
        Pantry
      </Typography>
    </Box>
    
    <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
      {pantry.map((i) => (
        <Box
          key={i}
          width="100%"
          minHeight="150px"
          bgcolor="#898989"
          color="white"
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingX={5}
        >
          <Typography
            variant="h3"
            color={'333'}
            textAlign={"center"}
          >
            {i}
          </Typography>
        <Button variant="contained" onClick={() => removeItem(i)}>Remove</Button>
        </Box>
      ))}
    </Stack>
    </Box>
  </Box>;


}

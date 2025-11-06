import Club from "../models/club.js";

const createClub = async (req, res) => {
  try {
    const club = new Club(req.body);
    const token = await club.genAuthToken()
    await club.save();
    res.status(201).send({club,token});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

const getMyClubs = async (req, res) => {
 res.send(req.club)
}

const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).send({ error: "Club not found" });
    }

    res.send(club);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
}

const updateClubById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'league'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).send({ error: "Club not found" });
    }

    updates.forEach(update => club[update] = req.body[update]);
    await club.save();
    
    res.send(club);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

const deleteClubById = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);

    if (!club) {
      return res.status(404).send({ error: "Club not found" });
    }

    res.send(club);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
}

const clubLogin = async(req,res)=>{
  try{
    const club = await Club.findByCredentials(req.body.email,req.body.password)
    const token = await club.genAuthToken()
    res.send({club,token})
  }catch(e){
    res.status(400).send('Invalid Login')
  }
}

export { createClub, getMyClubs, getClubById, updateClubById, deleteClubById,clubLogin };
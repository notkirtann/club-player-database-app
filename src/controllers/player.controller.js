import Player from "../models/player.js";

const createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({}).populate('clubId', 'name league');
    res.send(players);
  } catch (error) {
    res.status(500).send({ error: "Error fetching players" });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('clubId', 'name league');
    if (!player) {
      return res.status(404).send({ error: "Player not found" });
    }
    res.send(player);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const updatePlayerById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'position', 'jerseyNumber', 'age', 'clubId', 'isActive'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const player = await Player.findById(req.params.id);
    
    if (!player) {
      return res.status(404).send({ error: "Player not found" });
    }

    updates.forEach(update => player[update] = req.body[update]);
    await player.save();
    
    res.send(player);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

const deletePlayerById = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);

    if (!player) {
      return res.status(404).send({ error: "Player not found" });
    }

    res.send(player);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
}

// const getPlayersByClub = async (req, res) => {
//   try {
//     const players = await Player.find({ clubId: req.params.clubId }).populate('clubId', 'name league');
//     res.send(players);
//   } catch (error) {
//     res.status(500).send({ error: "Error fetching players" });
//   }
// }

export { createPlayer, getAllPlayers, getPlayerById, updatePlayerById, deletePlayerById, //getPlayersByClub 
        };
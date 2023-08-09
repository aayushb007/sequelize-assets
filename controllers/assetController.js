const Asset = require("../models/Asset"); // Make sure the path is correct based on your project structure

// Create a new asset
async function createAsset(req, res) {
  try {
    const asset = await Asset.create(req.body);
    return res.status(201).json(asset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get all assets
async function getAllAssets(req, res) {
  try {
    const assets = await Asset.findAll();
    return res.json(assets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get a specific asset by ID
async function getAssetById(req, res) {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    return res.json(asset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Update an asset
async function updateAsset(req, res) {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    await asset.update(req.body);
    return res.json(asset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Delete an asset
async function deleteAsset(req, res) {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    await asset.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
};

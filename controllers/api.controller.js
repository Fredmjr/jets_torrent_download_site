import {
  app_data,
  app_data_privacy,
  app_data_terms,
  app_vrsn_data,
} from "../data/data.js";
import path from "path";

export const apiUrl = async (req, res) => {
  try {
    return res.status(200).json({
      mgs: "test",
    });
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};

//Learn more data
export const lrnmrdataUrl = async (req, res) => {
  try {
    if (app_data) {
      return res.status(200).json({
        app_data: app_data,
      });
    } else {
      return res.status(200).json({
        erMgs: "Failed to fetch data!",
      });
    }
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};
//privacy data
export const prvcyUrl = async (req, res) => {
  try {
    if (app_data) {
      return res.status(200).json({
        app_data: app_data_privacy,
      });
    } else {
      return res.status(200).json({
        erMgs: "Failed to fetch data!",
      });
    }
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};

//terms data
export const trmsUrl = async (req, res) => {
  try {
    if (app_data) {
      return res.status(200).json({
        app_data: app_data_terms,
      });
    } else {
      return res.status(200).json({
        erMgs: "Failed to fetch data!",
      });
    }
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};

//download app
export const dwnlappUrl = async (req, res) => {
  try {
    const app_nm = "Jets_torrent - v1.0.0.txt";
    const filePath = path.join(
      process.cwd(),
      "app_assets",
      "app_versions",
      "current_version",
      app_nm,
    );
    res.download(filePath, app_nm, (err) => {
      if (err) {
        res.status(500).json({ erMgs: "Failed to download!" });
      }
    });
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};

//APP METADATA
//upload
/* export const upldvrsnUrl = async (req, res) => {
  const {} = req.body;
  try {
    const uploaded = await versionModel.create({
      where: {
        app_nm_v: app_nm_v,
        app_path: app_path,
        app_size: app_size,
        version_date: version_date,
        fix_1: fix_1,
        fix_2: fix_2,
        fix_3: fix_3,
        fix_4: fix_4,
        fix_5: fix_5,
      },
    });
    res.download(filePath, app_nm, (err) => {
      if (err) {
        res.status(500).json({ erMgs: "Failed to download!" });
      }
    });
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};

 */

//version data
export const vrsndataUrl = async (req, res) => {
  try {
    if (app_vrsn_data) {
      return res.status(200).json({
        app_data: app_vrsn_data,
      });
    } else {
      return res.status(200).json({
        erMgs: "Failed to fetch data!",
      });
    }
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};
//version download
export const vrndwnldUrl = async (req, res) => {
  const { id } = req.params;
  const app_nm = `${id}.txt`;
  try {
    console.log(app_nm);
    const filePath = path.join(
      process.cwd(),
      "app_assets",
      "app_versions",
      "old_version",
      app_nm,
    );
    res.download(filePath, app_nm, (err) => {
      if (err) {
        res.status(500).json({ erMgs: "Failed to download!" });
      }
    });
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};

//sggst page
export const sggstUrl = async (req, res) => {
  try {
    res.status(200).render("components/suggestion");
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};
//like section
export const lkUrl = async (req, res) => {
  try {
    res.status(200).render("components/like");
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};

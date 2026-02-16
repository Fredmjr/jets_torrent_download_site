import {
  app_data,
  app_data_privacy,
  app_data_terms,
  app_vrsn_data,
} from "../data/data.js";
import path from "path";
import likeModel from "../models/like.model.js";
import { decryptJWT } from "../middleware/jwe/decrypt.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { eml_validation_fuc } from "../middleware/email/email.validation.js";
import txtModel from "../models/txt.model.js";

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

//number of likes
export const lknumUrl = async (req, res) => {
  const { id, like } = req.body;

  try {
    const de_token = id;
    if (!id && !like) {
      res.status(400).json({
        erMgs: "Unable to tell the team you liked the project. try again!",
      });
    }
    const secretKey = Buffer.from(process.env.SECRETHEX, "hex");

    const decrpted_id = await decryptJWT(de_token, secretKey);

    if (decrpted_id.payload.ky) {
      const alrdy_like_crtd = await likeModel.findOne({
        where: {
          usr_id: decrpted_id.payload.ky,
        },
      });
      if (alrdy_like_crtd) {
        return res.status(200).json({
          erMgs: "Already submitted!",
        });
      } else {
        const like_crtd = await likeModel.create({
          usr_id: decrpted_id.payload.ky,
          like_num: like,
        });
        if (!like_crtd) {
          return res.status(400).json({
            erMgs: "Unable to tell the team you liked the project. try again!",
          });
        }
        return res.status(200).json({
          lk_sttus: true,
          mgs: "Sent. Thank you for liking project!",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};

//suggestion txt_datas
export const txtdataUrl = async (req, res) => {
  const { txt_data, id, eml } = req.body;
  const uuid = uuidv4();
  console.log(uuid);
  try {
    if (!eml) {
      return res.status(400).json({
        erMgs: "Email is missing!",
      });
    }
    //1. email validation
    const isValid = eml_validation_fuc(eml);
    if (isValid === false) {
      return res.json({
        erMgs: "Please enter a valid email address.",
      });
    }

    if (!txt_data) {
      return res.status(400).json({
        erMgs: "Description field is empty!",
      });
    }
    if (!id) {
      return res.status(400).json({
        erMgs: "Unable to complete request!",
      });
    }

    const de_token = id;
    const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
    const decrpted_id = await decryptJWT(de_token, secretKey);
    const usr_id = decrpted_id.payload.ky;
    console.log("txt_data :", txt_data, "id :", decrpted_id.payload.ky);
    //maxmum txt submissions are 3
    const mx_submttd_txt = await txtModel.findAll({
      where: {
        usr_id: usr_id,
      },
    });
    console.log(mx_submttd_txt.length);
    if (mx_submttd_txt.length > 3) {
      return res.status(400).json({
        txt_pending_sttus: true,
        mgs: "You have more than 3 submissions made already. Waiting for review. Kindly wait for response or check your email!",
      });
    }

    //2. write txt (review, suggestion or issue report) file
    const filePath = path.join(
      process.cwd(),
      "app_assets",
      "suggestion_box",
      "md",
    );
    const filename = `${uuid}.md`;
    const fullPath = path.join(filePath, filename);
    //file write
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(fullPath, txt_data, "utf8");

    ///check if file was written
    if (fs.existsSync(fullPath)) {
      //3. tie txt, id (from token) & validated email in db
      const crtd = await txtModel.create({
        usr_id: usr_id,
        email: eml,
        rvw_sggtn_issrprt_nm: filename,
      });
      return res.status(200).json({
        txt_sttus: true,
        mgs: "Submitted. Thank you!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};

/* fetchAllAdmins.js is used to create an end point for admin to fetch all admins available in the system*/

import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.get("/", async (req, res) => {
  let success = false;

  try {
    const fetchAdmins = `SELECT admin.* FROM admin,login WHERE id=a_id;`;

    // Fetching tickets
    con.query(fetchAdmins, (err, qres) => {
      if (err) {
        console.log(err.message);
        res.json({ success });
      } else if (qres) {
        qres.map((i)=>{
            const date = new Date(i.a_dob);
            const dob = date.toLocaleString();
            i.a_dob = dob.substring(0, dob.indexOf(","));
        })
        success = true;
        res.json({ success, admins: qres });
      } else {
        res.json({ success, admins: qres });
      }
    });
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Some error occured");
  }
});

export default router;

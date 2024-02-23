import express from "express";
import { tokenAuth } from "../middlewares/authMiddleware.js";
import * as teamController from "../controllers/teamController.js";

const router = express.Router();

router
  .route("/")
  .get(tokenAuth, teamController.allTeamsOfUser)
  .post(tokenAuth, teamController.createTeam)
  .delete(tokenAuth, teamController.deleteTeam)
  .put(tokenAuth, teamController.updateTeam);
router
  .route("/member")
  .get(tokenAuth, teamController.getMembers)
  .put(tokenAuth, teamController.addMember)
  .delete(tokenAuth, teamController.deleteMember);
router.put("/join", tokenAuth, teamController.joinTeam);
router.put("/code", tokenAuth, teamController.teamToken);

export default router;

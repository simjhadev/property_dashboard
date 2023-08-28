import express from 'express';

import {
    getAllUsers,
    createUser,
    getUserInfoByID,
    updateUserByID,
} from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserInfoByID);
router.route('/:id').patch(updateUserByID);

export default router;
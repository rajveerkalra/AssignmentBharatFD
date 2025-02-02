/**
 * @swagger
 * components:
 *   schemas:
 *     FAQ:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         question:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *               description: Question in English
 *             hi:
 *               type: string
 *               description: Question in Hindi
 *         answer:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *               description: Answer in English
 *             hi:
 *               type: string
 *               description: Answer in Hindi
 *         category:
 *           type: string
 *           description: FAQ category
 *         order:
 *           type: number
 *           description: Display order of the FAQ
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: FAQ status
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     Admin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         username:
 *           type: string
 *           minLength: 3
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Password (will be hashed)
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           enum: [admin, super-admin]
 *           default: admin
 *         isActive:
 *           type: boolean
 *           default: true
 *     
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   - name: FAQ
 *     description: FAQ management endpoints
 *   - name: Admin
 *     description: Admin management endpoints
 */

/**
 * @swagger
 * /api/faqs:
 *   get:
 *     summary: Get all FAQs
 *     tags: [FAQ]
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, hi]
 *         description: Language code (default: en)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter FAQs by category
 *     responses:
 *       200:
 *         description: List of FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FAQ'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   
 *   post:
 *     summary: Create a new FAQ
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQ'
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQ'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *
 * /api/faqs/{id}:
 *   get:
 *     summary: Get FAQ by ID
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FAQ ID
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, hi]
 *         description: Language code
 *     responses:
 *       200:
 *         description: FAQ found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQ'
 *       404:
 *         description: FAQ not found
 *   
 *   put:
 *     summary: Update FAQ
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQ'
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: FAQ not found
 *   
 *   delete:
 *     summary: Delete FAQ
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: FAQ not found
 *
 * /api/admin/register:
 *   post:
 *     summary: Register new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid input
 *
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *
 * /api/admin/profile:
 *   get:
 *     summary: Get admin profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Unauthorized
 *   
 *   patch:
 *     summary: Update admin profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */

module.exports = {};
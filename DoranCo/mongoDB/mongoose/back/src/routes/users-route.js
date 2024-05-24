import express from "express";
import { UserModel } from "../database/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"


export const usersRouter = express.Router();
const SECRET_KEY=('bonjour')
usersRouter.post("/inscription", async (req, res) => {
  console.log(req.body);

  // * Step 1: Test the received data
  const { email, password, username } = req.body;

  if (!email.includes("@") || username === "" || password.length < 6) {
    return res.status(400).json({ error: "incorrect data" });
  }

  //   * Step 2: Test if the user exists
  // * Step 2.1: Get the user in the DB
  const userFromDB = await UserModel.find({ email: email });
  console.log(userFromDB);
  // Test if user exists
  if (userFromDB.length > 0) {
    return res.status(401).json({ error: "this user already exists" });
  }

  // * Step 3: Hash the password
  const hashedPassword = await bcrypt.hash(password, 6);
  console.log(hashedPassword);

  // * Step 4: Register the user
  const newUser = new UserModel({
    email,
    hashedPassword,
    username,
  });

  const user = await newUser.save();
  console.log(user);
  return res.json({
    user: {
      email: user.email,
      username: user.username,
      id: user._id,
    },
  });
});

// TODO:
// Exercice:
// Créer une route: /api/user/connexion
//     Verifier si l'email et le mot de passe on ete réçu dans le coprs de la requete sinon retourner un erreur
//     Récuperer l'utilisateur depuis la base de données avec son mail, retourner un erreur si il n'existe pas
//     Verifier si le mot de passe est correcte (utiliser la methode compare de bcrypt)
//     Retourner l'utilisateur dans la réponse

usersRouter.post("/connexion", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || password < 6) {
    return res.status(400).json({ error: "incorrect data" });
  }

  // destructuring the array returned by UserModel.find
  const [userFromDB] = await UserModel.find({ email: email });
  console.log("testuserfromdb");
  console.log(userFromDB);

  if (!userFromDB) {
    return res.status(401).json({ error: "this user doesn't exist" });
  }

  // compare passwords

  const isPasswordValid = await bcrypt.compare(
    password,
    userFromDB.hashedPassword
  );

  if (!isPasswordValid) {
    return res.status(401).json({ error: "incorrect credentials" });
  }

  const access_token =jsonwebtoken.sign({id:userFromDB._id}, SECRET_KEY);
  console.log(access_token);
  res.json({user:userFromDB, access_token})
});


usersRouter.get('/me', async(req,res)=>{
  const access_token=req.headers.authorization;
  const token =access_token.split(' ')[1]
  const verifiedToken =jsonwebtoken.verify(token, SECRET_KEY);

  if(!verifiedToken){
    return res.status(404).json[{erreur:'Token invalide'}]
  }

  const user = await UserModel.findById(verifiedToken.id);

  return res.json({user})
})

usersRouter.put('/me', async (req, res) => {
  const { username, avatarUrl } = req.body;

  if (!username || !avatarUrl) {
    return res.status(400).json({ error: "Données incorrectes" });
  }

  const autorise = req.headers.authorization;
  if (!autorise) {
    return res.status(401).json({ error: "Autorisation requise" });
  }

  const token = autorise.split(' ')[1];
  try {
    const verifiedToken = jsonwebtoken.verify(token, SECRET_KEY);
    const user = await UserModel.findById(verifiedToken.id);
    if (!user) {
      console.log(token);
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    user.username = username;
    user.avatarUrl = avatarUrl;
    await user.save();

    return res.json({ user });
  } catch (error) {
    return res.status(401).json({ error: "Token invalide" });
  }
});

usersRouter.post('/posts', async (req,res)=>{
  const dataSend=req.body
  if(!dataSend){
    return res.status(400).json({error:"Publication impossible"})
  }
  const tokenPublication=req.headers.authorization
  const checkToken=jsonwebtoken.verify(tokenPublication, SECRET_KEY)
  if(!checkToken){
    return res.status(401).json({error:'Token pas bon'})
  }
  const newPublication= new ModifModel({
    userID:checkToken.id,
    title:dataSend.title,
    description:dataSend.description,
    imageUrl:dataSend.imageUrl
  })
  const newPublactionAjouter= await newPublication.save()
  return res.json({post:newPublactionAjouter})
})

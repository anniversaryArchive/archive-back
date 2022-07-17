const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
 
const User = require('../models/user');
 
module.exports = () => {
   passport.use(
      "google",
      new GoogleStrategy(
         {
            clientID: process.env.GOOGLE_ID, 
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: '/auth/google/callback', 
         },
         async (accessToken, refreshToken, profile, done) => {
            console.log('google profile : ', profile);
            try {
                  console.log('create');
                  const newUser = await new User({
                     email: profile?.email[0].value,
                     nickName: profile.displayName,
                     provider: 'google',
                     token: accessToken,
                  }).save();
                  done(null, newUser); 
            } catch (error) {
               console.error(error);
               done(error);
            }
         },
      ),
   );
};

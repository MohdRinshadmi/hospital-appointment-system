import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import JWTStrategy from "passport-jwt";
import Patient from "../model/patient.model";
import Doctor from "../model/doctor.model";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  "Patient",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, cb) => {
      try {
        const user = await Patient.findOne({ username });
        if (user && user.password === password) {
          return cb(null, user, { status: 200, message: "Login Successful." });
        } else {
          return cb(null, false, { status: 401, message: "Incorrect username or password." });
        }
      } catch (err) {
        return cb(null, false, { status: 401, message: "Patient Does Not Exist" });
      }
    }
  )
);

passport.use(
  "Doctor",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, cb) => {
      try {
        const user = await Doctor.findOne({ username });
        if (user && user.password === password) {
          return cb(null, user, { status: 200, message: "Login Successful." });
        } else {
          return cb(null, false, { status: 401, message: "Incorrect username or password."});
        }
      } catch (err) {
        console.log(err);
        return cb(null, false, { status: 401, message: "Doctor Does Not Exist" });
      }
    }
  )
);

passport.use(new JWTStrategy(
    {
      jwtFromRequest: (req) => req.headers["x-access-token"],
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => { 
      return done(null, payload); 
    }
));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});


//  This file sets up Passport authentication strategies for both Patients and Doctors using the LocalStrategy.
//     - For each user type, it checks the username and password against the database.
//     - If credentials are correct, authentication succeeds and the user object is returned.
//     - If credentials are incorrect or the user does not exist, authentication fails with an appropriate message.
//     - These strategies allow Passport to handle login requests for Patients and Doctors separately.
/*
  What this file does:
  - Imports required modules and models for authentication.
  - Sets up Passport LocalStrategy for "Patient" and "Doctor":
      - Checks username and password against the database.
      - Calls the callback with user info if authentication succeeds, or with an error message if it fails.
  - Sets up Passport JWTStrategy:
      - Authenticates users based on JWT tokens sent in the "x-access-token" header.
      - If the token is valid, the payload is returned.
  - passport.serializeUser:
      - Defines how user data is stored in the session after authentication.
      - Only stores minimal info (id and username) to keep the session lightweight.
  - passport.deserializeUser:
      - Defines how to retrieve user data from the session for subsequent requests.
      - Reconstructs the user object from the stored session data.
  Why use serializeUser and deserializeUser?
  - These methods are used by Passport to manage user sessions.
  - serializeUser saves user info to the session after login.
  - deserializeUser retrieves user info from the session for each request, allowing Passport to identify the logged-in user.
*/

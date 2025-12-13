import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { AuthService } from "../../services/auth.service.js";

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];

export const registerValidation = [
  body('first_name').trim().isLength({ min: 2, max: 50 }),
  body('last_name').trim().isLength({ min: 2, max: 50 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
];

export class AuthController {
  constructor(private authService: AuthService) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ 
          success: false,
          error: "Invalid input", 
          details: errors.array() 
        });
        return;
      }

      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ 
          success: false,
          error: "Email and password are required" 
        });
        return;
      }

      const user = await this.authService.validateCredentials(email, password);
      if (!user) {
        res.status(401).json({ 
          success: false,
          error: "Invalid email or password" 
        });
        return;
      }

      if (!user.isActive) {
        res.status(403).json({ 
          success: false,
          error: "Account is deactivated" 
        });
        return;
      }

      const token = this.authService.signToken(user);
      res.json({ 
        success: true,
        token, 
        user: { 
          id: user.id, 
          first_name: user.first_name,
          last_name: user.last_name, 
          email: user.email 
        } 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        success: false,
        error: "An error occurred during login. Please try again." 
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ 
          success: false,
          error: "Invalid input", 
          details: errors.array() 
        });
        return;
      }

      const { first_name, last_name, email, password } = req.body;

      if (!first_name || !last_name || !email || !password) {
        res.status(400).json({ 
          success: false,
          error: "First name, last name, email, and password are required" 
        });
        return;
      }

      const emailExists = await this.authService.emailExists(email);
      if (emailExists) {
        res.status(409).json({ 
          success: false,
          error: "An account with this email already exists" 
        });
        return;
      }

      const user = await this.authService.createUser({ first_name, last_name, email, password });
      const token = this.authService.signToken(user);

      res.status(201).json({ 
        success: true,
        message: "Account created successfully",
        token, 
        user: { 
          id: user.id, 
          first_name: user.first_name,
          last_name: user.last_name, 
          email: user.email 
        } 
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        success: false,
        error: "An error occurred during registration. Please try again." 
      });
    }
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ 
          success: false,
          error: "Google token is required" 
        });
        return;
      }

      const googleData = await this.authService.verifyGoogleToken(token);
      if (!googleData) {
        res.status(401).json({ 
          success: false,
          error: "Invalid Google token" 
        });
        return;
      }

      let user = await this.authService.findByEmail(googleData.email);
      
      if (!user) {
        // Create new user from Google data
        user = await this.authService.createGoogleUser({
          ...googleData,
          google_id: token // Use token as temp ID, should extract from payload
        });
      }

      if (!user.isActive) {
        res.status(403).json({ 
          success: false,
          error: "Account is deactivated" 
        });
        return;
      }

      const jwtToken = this.authService.signToken(user);
      res.json({ 
        success: true,
        token: jwtToken, 
        user: { 
          id: user.id, 
          first_name: user.first_name,
          last_name: user.last_name, 
          email: user.email,
          avatar_url: user.avatar_url
        } 
      });
    } catch (error) {
      console.error('Google login error:', error);
      res.status(500).json({ 
        success: false,
        error: "An error occurred during Google login. Please try again." 
      });
    }
  }
}
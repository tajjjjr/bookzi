export function authMiddleware(authService) {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

      const token = authHeader.split(" ")[1]; // Bearer <token>
      const user = await authService.getUserFromJWT(token);

      if (!user) return res.status(401).json({ error: "Unauthorized" });

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}

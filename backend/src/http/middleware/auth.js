export function authMiddleware(authService) {
  return async function (req, res, next) {
    try {
      const user = await authService.getUserFromRequest(req);

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}

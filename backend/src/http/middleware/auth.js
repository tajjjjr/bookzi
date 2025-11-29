module.exports = (authAdapter) => async (req, res, next) => {
  try {
    const ok = await authAdapter.isAuthenticated(req);
    if (!ok) return res.status(401).json({ error: "Unauthorized" });

    next();
  } catch (e) {
    res.status(500).json({ error: "Auth error", details: e.message });
  }
};

import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token') || req.headers.authorization?.split(' ')[1];

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = {
      _id: decoded.user._id || decoded.user.id // Fallback to `id` if `_id` is not present
    };
    // Check if user data is not present in the token
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: 'Token does not contain valid user data' });
    }
    console.log('User ID from token:', req.user._id);

    next();
  } catch (err) {
    console.error('Error decoding token:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export { protect };
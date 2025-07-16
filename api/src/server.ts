import app from './app';
import { connect } from './models/db';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connect(); // Test database connection
    console.log('Conexión a la base de datos establecida');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();
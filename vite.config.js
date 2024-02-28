
import path from 'path'
import react from '@vitejs/plugin-react'
export default {
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    port: 3000,
    hot: true
  },
 
  
}
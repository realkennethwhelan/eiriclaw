import { LangProvider } from './LangContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Integrations from './components/Integrations'
import UseCases from './components/UseCases'
import Download from './components/Download'
import ConfigWizard from './components/ConfigWizard'
import Footer from './components/Footer'

function App() {
  return (
    <LangProvider>
      <div style={{ backgroundColor: '#050F08', minHeight: '100vh' }}>
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Integrations />
          <UseCases />
          <Download />
          <ConfigWizard />
        </main>
        <Footer />
      </div>
    </LangProvider>
  )
}

export default App

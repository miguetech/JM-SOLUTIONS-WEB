import SplitText from "../SplitText";
import Squares from "../Squares";

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      <Squares
        speed={0.1}
        squareSize={100}
        direction="diagonal"
        borderColor="#fff"
        hoverFillColor="#222"
        
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <SplitText
              text="Work smart,"
              className=""
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            <span className="text-accent-blue">
              {" "}
              <SplitText
                text="not harder"
                className=""
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
              
            </span>
          </h1>

          
            
          <SplitText
                text="Soluciones digitales inteligentes con IA y automatización para impulsar tu negocio"
                className="text-xl md:text-2xl text-text-light mb-12 max-w-3xl mx-auto"
                delay={10}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
        

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#servicios"
              className="bg-accent-blue text-background-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-dark hover:text-white transition"
            >
              Ver Servicios
            </a>
            <a
              href="#contacto"
              className="bg-transparent border-2 border-accent-blue text-accent-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-blue hover:text-background-dark transition"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

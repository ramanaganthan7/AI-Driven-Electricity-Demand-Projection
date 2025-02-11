import temp1 from "../assets/temp1.png";
import temp2 from "../assets/temp2.jpeg";    
import demand1 from "../assets/demand1.png";
import demand2 from "../assets/demand2.jpeg";
function PredictionCard({ title, modelName, rmseValue, imageSrc }) {
    return (
      <div className="card mb-8">
        <div className="card-content p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <img
                src={imageSrc || "/placeholder.svg"}
                alt={title}
                width={800}
                height={1000}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-6">
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">Model:</span> {modelName}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">RMSE:</span> {rmseValue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default function Models() {
    return (
      <div className="container mx-auto px-4 py-8">
  
        <section>
          <h2 className="text-2xl font-semibold mb-4">Temperature Prediction</h2>
          <PredictionCard
            title="Random Forest Regression"
            modelName="Random Forest Regression"
            rmseValue={3.2}
            imageSrc={temp1}
          />
          <PredictionCard
            title="Long Short-Term Memory"
            modelName="Long Short-Term Memory"
            rmseValue={1.88}
            imageSrc={temp2}
          />
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-4 mt-8">Electricity Demand Prediction</h2>
          <PredictionCard
            title="Random Forest Regression"
            modelName="Random Forest Regression"
            rmseValue={293.60}
            imageSrc={demand1}
          />
          <PredictionCard
            title="temporal fusion transformer"
            modelName="Temporal Fusion Fransformer"
            rmseValue={209.6}
            imageSrc={demand2}
          />
        </section>
      </div>
    );
  }
  
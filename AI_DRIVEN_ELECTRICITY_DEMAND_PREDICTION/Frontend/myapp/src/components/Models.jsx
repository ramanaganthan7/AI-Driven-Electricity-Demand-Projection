import temp1 from "../assets/temp1.png";
import demand1 from "../assets/demand1.png";
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
            rmseValue={1.23}
            imageSrc={temp1}
          />
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-4">Electricity Demand Prediction</h2>
          <PredictionCard
            title="Random Forest Regression"
            modelName="Random Forest Regression"
            rmseValue={0.89}
            imageSrc={demand1}
          />
        </section>
      </div>
    );
  }
  
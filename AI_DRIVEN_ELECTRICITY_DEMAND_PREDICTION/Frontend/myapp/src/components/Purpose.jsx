import p1 from "../assets/arc.jpeg";
import p2 from "../assets/arc2.jpg";

export default function Purpose() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Introduction Section */}
      <section className="text-left  mx-auto mb-12 ml-auto">
      <h1 className="text-3xl font-bold mb-6 mt-5" >Introduction</h1>
        <p className="text-lg text-muted-foreground text-left text-justify">
          As global energy consumption continues to rise, accurate electricity demand forecasting is essential for efficient power generation and distribution. Our platform provides precise electricity demand predictions for 2025, helping energy providers, businesses, and policymakers make informed decisions.
        </p>
      </section>

      {/* Why Predict Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div className="space-y-4">
          <h2 className=" text-left text-2xl font-bold">Why Predict Electricity Demand?</h2>
          <p className="text-muted-foreground text-gray-900 text-left text-justify">
          Electricity demand fluctuates due to various factors such as seasonal changes, monthly trends, temperature variations, holidays, and weekdays. Accurate forecasting helps:
          </p>
          <p className="text-muted-foreground text-left text-justify">
          Prevent power shortages and blackouts by balancing supply and demand.
            </p>
            <p className="text-muted-foreground text-left text-justify">
            Optimize energy generation and distribution to reduce costs.
            </p>
            <p className="text-muted-foreground text-left text-justify">
            Enhance grid stability and efficiency for sustainable energy use.

            </p>
            <p className="text-muted-foreground text-left text-justify">
            Support renewable energy integration by aligning supply with demand trends.
            </p>

        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <img
            src={p1}
            alt="Electricity demand prediction visualization"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Who Can Benefit Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative h-[300px] rounded-lg overflow-hidden order-2 md:order-1">
          <img
            src={p2}
            alt="Beneficiaries of electricity demand prediction"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4 order-1 md:order-2">
          <h2 className=" text-left text-2xl font-bold">Who Can Benefit?</h2>
          <p className="text-muted-foreground text-left text-justify">
         <span className="text-gray-900" > Power Grid Operators – </span> Plan energy distribution efficiently.
          </p>
          <p className="text-muted-foreground text-left text-justify">
          <span className="text-gray-900" >Businesses & Industries –</span> Optimize electricity usage and costs.
          </p>
          <p className="text-muted-foreground text-left text-justify">
          <span className="text-gray-900" >Government & Policymakers –</span> Develop sustainable energy strategies.
          </p>
          <p className="text-muted-foreground text-left text-justify">
          <span className="text-gray-900" >Consumers – </span>Gain insights into peak demand periods for cost savings.
          </p>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="text-left  mx-auto mb-12 ml-auto">
        <h2 className="text-2xl font-bold mb-6">Conclusion</h2>
        <p className="text-lg text-muted-foreground text-left text-justify">
        By leveraging data-driven insights, our platform ensures a stable, cost-effective, and sustainable electricity supply in 2025. Explore our forecasts and prepare for the future of energy!        </p>
      </section>
    </div>
  )
}


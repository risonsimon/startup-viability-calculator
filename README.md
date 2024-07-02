# Startup Viability Calculator

Calculator for estimating the viability of a startup idea based on Jason Cohen's [Excuse me, is there a problem?](https://longform.asmartbear.com/problem/) article.

## Getting Started

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/startup-viability-calculator.git
   cd startup-viability-calculator
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Start the development server:
   ```
   pnpm dev
   ```

## Calculator Fields

The Startup Viability Calculator uses the following metrics:

1. **Potential Customers**: Estimates the number of potential customers (consumers or businesses) who actually have the problem your startup aims to solve. Values range from 1,000 to 1 billion.

2. **Willingness to Solve**: Assesses how willing potential customers are to solve the problem. This ranges from "Few agree or care" (0.01) to "Almost impossible to find someone who doesn't care" (1.0).

3. **Annual Budget**: Represents the annual allocated budget that potential customers have for solving this problem. Values range from $1 to $1 million.

4. **Frequency of Purchase**: Indicates how often customers make a purchase decision. This ranges from "Every few years" (0.01) to "Always in the market, easy to switch" (1.0).

5. **Attitude Towards Company**: Measures potential customers' attitude towards your company. This ranges from "They cannot buy from you" (0) to "Mission-level emotional desire to select you" (1.0).

6. **Differentiation**: Assesses your competitive differentiation in the market. This ranges from "No material differentiation" (0.1) to "One-of-a-kind solution that has no viable alternative" (1.0).

7. **Churn**: Estimates customer retention and recurring revenue potential. This ranges from "One-off purchase without loyalty" (0.01) to "Strong lock-in from fiat, integrations, or being the system-of-record for a business-critical system" (1.0).

The calculator combines these metrics to produce a final score. A score of 1 or higher suggests viability for an indie startup, while a score of 2 or higher indicates potential for a scale-up.

## Acknowledgments

This project was kickstarted with the help of [claude-artifacts-react](https://github.com/risonsimon/claude-artifacts-react) and [Claude.ai](https://claude.ai/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

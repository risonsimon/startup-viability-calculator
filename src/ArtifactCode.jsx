import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const criteriaOptions = {
  potentialCustomers: [
    { value: "1k", label: "1k" },
    { value: "10k", label: "10k" },
    { value: "100k", label: "100k" },
    { value: "1M", label: "1M" },
    { value: "10M", label: "10M" },
    { value: "100M", label: "100M" },
    { value: "1B", label: "1B" },
  ],
  willingnessToSolve: [
    { value: "0.01", label: "Few agree or care (0.01)" },
    { value: "0.1", label: "Thought-leaders care and evangelize (0.1)" },
    { value: "0.5", label: "It's an industry standard-practice (0.5)" },
    {
      value: "1.0",
      label: "Almost impossible to find someone who doesn't care (1.0)",
    },
  ],
  annualBudget: [
    { value: "$1", label: "$1" },
    { value: "$10", label: "$10" },
    { value: "$100", label: "$100" },
    { value: "$1k", label: "$1k" },
    { value: "$10k", label: "$10k" },
    { value: "$100k", label: "$100k" },
    { value: "$1M", label: "$1M" },
  ],
  frequencyOfPurchase: [
    { value: "0.01", label: "Every few years (0.01)" },
    { value: "0.1", label: "An annual decision (0.1)" },
    { value: "1.0", label: "Always in the market, easy to switch (1.0)" },
  ],
  attitudeTowardsCompany: [
    { value: "0", label: "They cannot buy from you (0)" },
    { value: "0.1", label: "Structural challenges (0.1)" },
    { value: "0.5", label: "Indifferent; no red flags (0.5)" },
    {
      value: "1.0",
      label: "Mission-level emotional desire to select you (1.0)",
    },
  ],
  differentiation: [
    { value: "0.1", label: "No material differentiation (0.1)" },
    {
      value: "0.5",
      label:
        "Some features are so good, some people will buy just for that (0.5)",
    },
    {
      value: "1.0",
      label: "One-of-a-kind solution that has no viable alternative (1.0)",
    },
  ],
  churn: [
    { value: "0.01", label: "One-off purchase without loyalty (0.01)" },
    {
      value: "0.1",
      label:
        "One-off purchase, but happy customers will buy again and tell their friends (0.1)",
    },
    { value: "0.5", label: "Recurring-revenue from a recurring-problem (0.5)" },
    {
      value: "1.0",
      label:
        "Strong lock-in from fiat, integrations, or being the system-of-record for a business-critical system (1.0)",
    },
  ],
};

const criteriaExplanations = {
  potentialCustomers:
    "Number of potential customers (consumers or businesses) who actually have the problem",
  willingnessToSolve: "Willing to solve the problem",
  annualBudget: "Annual allocated budget",
  frequencyOfPurchase: "Frequency of purchase decision",
  attitudeTowardsCompany: "Attitude towards your company",
  differentiation: "Competitive differentiation",
  churn: "Will they still be here a year from now?",
};

const defaultLabels = {
  potentialCustomers: "Potential Customers",
  willingnessToSolve: "Willingness to Solve",
  annualBudget: "Annual Budget",
  frequencyOfPurchase: "Frequency of Purchase",
  attitudeTowardsCompany: "Attitude Towards Company",
  differentiation: "Differentiation",
  churn: "Churn",
};

const StartupViabilityCalculator = ({ customLabels = {} }) => {
  const labels = { ...defaultLabels, ...customLabels };

  const [scores, setScores] = useState({
    potentialCustomers: "1M",
    willingnessToSolve: "0.5",
    annualBudget: "$1k",
    frequencyOfPurchase: "0.1",
    attitudeTowardsCompany: "0.5",
    differentiation: "0.5",
    churn: "0.5",
  });
  const [finalScore, setFinalScore] = useState(0);

  const handleChange = (criterion, value) => {
    setScores((prevScores) => ({ ...prevScores, [criterion]: value }));
  };

  useEffect(() => {
    const calculateScore = () => {
      const potentialCustomersValue = parseFloat(
        scores.potentialCustomers.replace(
          /(\d+)([kMB])/,
          (match, number, suffix) => number * { k: 1e3, M: 1e6, B: 1e9 }[suffix]
        )
      );
      const annualBudgetValue = parseFloat(
        scores.annualBudget
          .replace("$", "")
          .replace("k", "000")
          .replace("M", "000000")
      );
      const score =
        (potentialCustomersValue *
          parseFloat(scores.willingnessToSolve) *
          annualBudgetValue *
          parseFloat(scores.frequencyOfPurchase) *
          parseFloat(scores.attitudeTowardsCompany) *
          parseFloat(scores.differentiation) *
          parseFloat(scores.churn)) /
        625000;
      setFinalScore(score);
    };
    calculateScore();
  }, [scores]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Startup Viability Calculator</h2>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          {Object.entries(criteriaOptions).map(([criterion, options]) => (
            <div
              key={criterion}
              className="mb-4 flex items-center"
            >
              <div className="w-1/3 flex items-center">
                <Label
                  htmlFor={criterion}
                  className="text-left"
                >
                  {labels[criterion]}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="ml-1 h-4 w-4 text-gray-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{criteriaExplanations[criterion]}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={scores[criterion]}
                onValueChange={(value) => handleChange(criterion, value)}
              >
                <SelectTrigger className="w-2/3">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </TooltipProvider>
        <div className="mt-6 flex items-center">
          <Label className="w-1/3 text-left text-lg font-semibold">
            Final Score
          </Label>
          <Input
            type="text"
            value={finalScore.toFixed(2)}
            readOnly
            className="w-2/3 font-bold text-lg"
          />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Score interpretation:
          <br />1 or higher: Viable for an indie startup
          <br />2 or higher: Potential for a scale-up
        </p>
      </CardContent>
    </Card>
  );
};

export default StartupViabilityCalculator;

import React from 'react';
import { benefits } from "@/utils/listOfBenefits";

import { ControllerRenderProps } from "react-hook-form";
import { motion } from 'framer-motion';
import { Check, Sparkles, ChevronRight } from 'lucide-react';

interface iAppProps {
  field: ControllerRenderProps;
}

export function BenefitsSelector({ field }: iAppProps) {
  function toggleBenefit(benefitId: string) {
    const currentBenefits = field.value || [];
    const newBenefits = currentBenefits.includes(benefitId)
      ? currentBenefits.filter((id: string) => id !== benefitId)
      : [...currentBenefits, benefitId];
    field.onChange(newBenefits);
  }

  const selectedCount = (field.value || []).length;
  const categories = {
    primary: benefits.slice(0, 10),
    secondary: benefits.slice(10)
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Job Benefits</h3>
          <p className="text-sm text-muted-foreground">
            Selected: {selectedCount} of {benefits.length}
          </p>
        </div>
        {selectedCount > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 text-primary text-sm"
          >
            <Sparkles size={14} />
            <span>Great choices!</span>
          </motion.div>
        )}
      </div>

      {/* Main Benefits Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Primary Benefits */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Popular Benefits
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.primary.map((benefit) => {
              const isSelected = (field.value || []).includes(benefit.id);
              return (
                <motion.button
                  key={benefit.id}
                  onClick={() => toggleBenefit(benefit.id)}
                  className={`
                    p-3 rounded-lg text-left transition-all duration-150
                    border hover:border-primary/50 group
                    ${isSelected ? 'bg-primary/5 border-primary' : 'bg-white dark:bg-gray-800 border-gray-200'}
                  `}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-2">
                    <div className={`
                      p-1.5 rounded-md transition-colors
                      ${isSelected ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-gray-700'}
                    `}>
                      {benefit.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{benefit.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Highly valued
                      </div>
                    </div>
                    {isSelected && (
                      <Check size={14} className="text-primary ml-auto mt-1" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Secondary Benefits */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Additional Benefits
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.secondary.map((benefit) => {
              const isSelected = (field.value || []).includes(benefit.id);
              return (
                <motion.button
                  key={benefit.id}
                  onClick={() => toggleBenefit(benefit.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
                    border transition-all duration-150
                    ${isSelected 
                      ? 'bg-primary text-white border-primary' 
                      : 'hover:border-primary/50 border-gray-200'}
                  `}
                >
                  <span className={`
                    transition-transform duration-150
                    ${isSelected ? 'scale-110' : 'group-hover:scale-110'}
                  `}>
                    {benefit.icon}
                  </span>
                  {benefit.label}
                  {isSelected && (
                    <ChevronRight size={14} className="ml-1 opacity-70" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Selection Bar */}
      <motion.div 
        className="h-1 bg-gray-100 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(selectedCount / benefits.length) * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
}

export default BenefitsSelector;
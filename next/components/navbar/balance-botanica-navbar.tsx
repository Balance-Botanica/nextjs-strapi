"use client";

import React from "react";
import { BalanceBotanicaHeader } from "./balance-botanica-header";
import { BalanceBotanicaMobileHeader } from "./balance-botanica-mobile-header";

type Props = {
  locale: string;
};

export const BalanceBotanicaNavbar = ({ locale }: Props) => {
  return (
    <>
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <BalanceBotanicaHeader locale={locale} />
      </div>
      
      {/* Mobile Header */}
      <div className="lg:hidden">
        <BalanceBotanicaMobileHeader locale={locale} />
      </div>
    </>
  );
}; 
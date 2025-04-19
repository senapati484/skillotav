"use client";
import { useState } from "react"

export function Token({
  category,
  color,
  quantity,
  quality,
  microTokens = []
}) {
  const [expanded, setExpanded] = useState(false)

  // Convert quality (0-100) to opacity (0.5-1)
  const opacity = 0.5 + (quality / 100) * 0.5

  return (
    <div className="flex flex-col items-center">
      <button
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-300`}
        style={{ backgroundColor: color, opacity }}
        onClick={() => setExpanded(!expanded)}>
        <span className="text-white font-bold">{quantity}</span>
      </button>
      <span className="text-sm">{category}</span>
      {expanded && microTokens.length > 0 && (
        <div className="mt-4 p-4 bg-muted rounded-lg w-64">
          <h4 className="font-semibold mb-2">Micro-tokens</h4>
          <div className="space-y-2">
            {microTokens.map((token, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm">{token.name}</span>
                <div className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                    style={{ backgroundColor: color, opacity: 0.5 + (token.value / 100) * 0.5 }}>
                    <span className="text-white text-xs">{Math.round(token.value / 10)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{token.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function TokenGrid({
  tokens
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {tokens.map((token, i) => (
        <Token key={i} {...token} />
      ))}
    </div>
  );
}

// Offline payment method configuration
// Update these with your actual payment details

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  handle: string;
  instructions: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "zelle",
    name: "Zelle",
    icon: "💳",
    handle: "your-zelle@email.com",
    instructions: "Send payment via Zelle to the email above. Include your order number in the memo.",
  },
  {
    id: "cashapp",
    name: "CashApp",
    icon: "💵",
    handle: "$YourCashTag",
    instructions: "Send payment via CashApp to the $cashtag above. Include your order number in the note.",
  },
  {
    id: "applepay",
    name: "Apple Cash",
    icon: "🍎",
    handle: "your-phone-number",
    instructions: "Send payment via Apple Cash to the number above via iMessage.",
  },
  {
    id: "venmo",
    name: "Venmo",
    icon: "📱",
    handle: "@YourVenmo",
    instructions: "Send payment via Venmo to the handle above. Include your order number in the note.",
  },
  {
    id: "chime",
    name: "Chime",
    icon: "🏦",
    handle: "$YourChimeTag",
    instructions: "Send payment via Chime to the $tag above.",
  },
];


import { Wrench, Sun, ShieldCheck, Leaf } from "lucide-react";

export type Service = {
    slug: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    image: string;
    price?: string;
    details: {
        introduction: string;
        keyAspects: string[];
        whatToExpect: {
            title: string;
            steps: string[];
        }
    }
};

export const SERVICES: Service[] = [
  {
    slug: "solar-panel-installation",
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: "Solar Panel Installation",
    description: "Expert installation of high-efficiency solar panel systems for residential, commercial, and industrial clients.",
    image: "/images/services/installation.jpg",
    details: {
        introduction: "Our team of certified professionals ensures your solar panel installation is seamless, efficient, and built to last. We handle every aspect of the process, from initial design and consultation to the final commissioning of your system, guaranteeing optimal performance and a swift return on your investment.",
        keyAspects: [
            "Custom system design tailored to your energy needs and property.",
            "Use of Tier-1, high-efficiency solar panels and reliable inverters.",
            "Professional installation by certified and experienced technicians.",
            "Full compliance with local safety standards and regulations.",
            "Post-installation support and system walkthrough."
        ],
        whatToExpect: {
            title: "Our Installation Process",
            steps: [
                "1. Consultation & Site Assessment: We start with a thorough evaluation of your energy needs and property.",
                "2. System Design & Proposal: You receive a detailed proposal with a custom system design and transparent pricing.",
                "3. Installation: Our team installs your system with minimal disruption to your home or business.",
                "4. Inspection & Commissioning: We conduct a final inspection and activate your new solar power system.",
                "5. Handover: We walk you through your new system and explain how to monitor its performance."
            ]
        }
    }
  },
  {
    slug: "solar-panel-cleaning",
    icon: <Sun className="h-10 w-10 text-primary" />,
    title: "Solar Panel Cleaning",
    description: "Maximize your system's efficiency with our professional panel cleaning service to ensure peak power output.",
    image: "/images/services/cleaning.jpg",
    price: "K70 per panel",
    details: {
        introduction: "Dust, dirt, and bird droppings can significantly reduce your solar system's energy output. Our professional cleaning service uses specialized equipment and techniques to safely and effectively clean your panels, ensuring they operate at maximum efficiency and protecting your investment.",
        keyAspects: [
            "Increases energy production by up to 30%.",
            "Extends the lifespan of your solar panels.",
            "Prevents potential 'hot spots' and panel damage.",
            "Uses eco-friendly, de-ionized water for a spot-free finish.",
            "Includes a visual inspection of your system for any potential issues."
        ],
        whatToExpect: {
            title: "Our Cleaning Process",
            steps: [
                "1. Safety First: Our team sets up safely, using appropriate fall protection equipment.",
                "2. Gentle Pre-rinse: We gently rinse the panels to loosen dirt and debris.",
                "3. Professional Brush-down: We use specialized, non-abrasive brushes to scrub the panel surfaces.",
                "4. Final Rinse: A final rinse with purified water leaves your panels sparkling and efficient.",
                "5. Service Report: You receive a confirmation of the service and any observations from our team."
            ]
        }
    }
  },
  {
    slug: "system-maintenance-and-support",
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "System Maintenance & Support",
    description: "Ensure your solar investment lasts with comprehensive maintenance packages and prompt support.",
    image: "/images/services/maintenance.jpg",
    details: {
        introduction: "A solar power system is a long-term investment. Our comprehensive maintenance and support plans are designed to keep your system running at peak performance for years to come. We offer proactive check-ups, prompt troubleshooting, and expert support to give you complete peace of mind.",
        keyAspects: [
            "Regular system health checks and performance analysis.",
            "Inspection of all components, including panels, inverters, and wiring.",
            "Prompt troubleshooting and repair services.",
            "Firmware updates for inverters and other components.",
            "Detailed reports on your system's health and performance."
        ],
        whatToExpect: {
            title: "Our Maintenance Plan",
            steps: [
                "1. Scheduled Visits: We schedule regular visits at your convenience for system check-ups.",
                "2. Comprehensive Inspection: Our technicians perform a multi-point inspection of your entire system.",
                "3. Performance Testing: We test the output and efficiency of your panels and inverter.",
                "4. Proactive Repairs: We identify and address any potential issues before they become major problems.",
                "5. Detailed Reporting: You receive a full report after each visit outlining the health of your system."
            ]
        }
    }
  },
  {
    slug: "energy-auditing-and-consultation",
    icon: <Leaf className="h-10 w-10 text-primary" />,
    title: "Energy Auditing & Consultation",
    description: "Our experts audit your energy usage and provide a detailed consultation to design the perfect solar solution.",
    image: "/images/services/audit.jpg",
    details: {
        introduction: "Thinking about going solar but not sure where to start? Our energy auditing and consultation service is the perfect first step. We analyze your current and future energy consumption patterns to provide expert advice and design a solar solution that is perfectly tailored to your needs and budget.",
        keyAspects: [
            "Detailed analysis of your electricity bills and usage patterns.",
            "Identification of energy-saving opportunities in your home or business.",
            "Customized solar system design and size recommendation.",
            "Clear breakdown of costs, savings, and return on investment.",
            "Expert advice on the best products and technologies for your situation."
        ],
        whatToExpect: {
            title: "Our Consultation Process",
            steps: [
                "1. Data Collection: We gather information on your energy usage and property.",
                "2. In-depth Analysis: Our experts analyze the data to understand your unique energy profile.",
                "3. Design & Proposal: We present you with a custom-designed solar solution and a clear, detailed proposal.",
                "4. Q&A Session: We answer all your questions to ensure you can make an informed decision.",
                "5. Path to Installation: Once you're ready, we seamlessly transition you to the installation phase."
            ]
        }
    }
  }
];

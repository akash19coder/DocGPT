import { motion } from "framer-motion";

const integrations = [
  {
    name: "Notion",
    logo: "/notion.png",
    color: "from-purple-400 to-pink-500",
  },
  {
    name: "Google Docs",
    logo: "/googledocs.png",
    color: "from-blue-400 to-green-500",
  },
  {
    name: "PDF",
    logo: "/pdf.png",
    color: "from-red-400 to-yellow-500",
  },
  {
    name: "Reddit",
    logo: "/reddit.png",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "Twitter",
    logo: "/x.png",
    color: "from-blue-300 to-blue-600",
  },
  {
    name: "GitHub",
    logo: "/github.png",
    color: "from-gray-600 to-gray-900",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const blobVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export function FlashyIntegrationsSectionComponent() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden ">
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        variants={blobVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        variants={blobVariants}
        initial="hidden"
        animate="visible"
      />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 text-white text-shadow-glow">
          Supercharge Your Workflow
        </h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              className="flex flex-col items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-24 h-24 mb-4 relative rounded-xl overflow-hidden bg-gradient-to-br ${integration.color} p-1`}
              >
                <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                  <img
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <p className="text-sm font-medium text-white text-shadow-glow">
                {integration.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

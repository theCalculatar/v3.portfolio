"use client";
import React, { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Preview({
  children,
  custom = null,
}: {
  children: React.ReactNode;
  custom?: React.ReactNode;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [layoutId] = useState<string>(
    () => "expandable-card" + crypto.randomUUID().split("-")[0],
  );

  return (
    <div className="relative">
      <motion.div layoutId={layoutId} onClick={() => setSelectedId(layoutId)}>
        {children}
      </motion.div>
      <AnimatePresence>
        {selectedId && (
          <Fragment>
            {/* Overlay  Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.75 } }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-xs z-50"
              onClick={() => setSelectedId(null)}
            />
            {/* Expanded Item */}
            <motion.div
              className="fixed inset-0 m-auto w-96 h-min-4 h-fit md:w-sm z-50 flex flex-col shadow-xl rounded-xl"
              layoutId={selectedId}
            >
              {custom ? custom : children}
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Preview;

import React, { useEffect } from 'react';

const GameComponent = ({ parameter }) => {

  useEffect(() => {
    const loadGame = async () => {
      const pyodide = await window.loadPyodide();
      await pyodide.loadPackage(["pygame-ce"], { checkIntegrity: false });
      const canvas = document.getElementById("canvas");
      pyodide.canvas.setCanvas2D(canvas);

      const url = "https://rajdevsharma.github.io/dogecode/game/game.zip";
      const zipResponse = await fetch(url);
      const zipBinary = await zipResponse.arrayBuffer();
      pyodide.unpackArchive(zipBinary, "zip", { extractDir: "/lib/python3.12/site-packages/caffeinefueled" });

      // Function to run Python code with updated parameter
      const runGameWithParameter = async (param) => {
        await pyodide.runPythonAsync(`
          import sys
          sys.path.append('/lib/python3.12/site-packages/caffeinefueled')
          import caffeinefueled.game
          caffeinefueled.game.main("${param}");
        `);
      };

      // Initial run
      runGameWithParameter(parameter);

      // Run with updated parameter whenever `parameter` changes
      return () => {}; // No cleanup needed for props change
    };

    loadGame();
  }, [parameter]); // Run effect whenever `parameter` changes

  return (
    <div className="demo">
      <div className="demo-header">Caffeine Fueled (pygame gamejam 2021 / by zyenapz)</div>
      <div className="demo-content">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
};

export default GameComponent;

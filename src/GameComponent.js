import React, { useEffect } from 'react';


const GameComponent = () => {

  useEffect(() => {
    const loadGame = async () => {
      // Load Pyodide
      const pyodide = await loadPyodide();
      await pyodide.loadPackage(["pygame-ce"], { checkIntegrity: false });

      // Set up canvas
      const canvas = document.getElementById("canvas");
      pyodide.canvas.setCanvas2D(canvas);

      // Fetch and unpack game files
      const zipResponse = await fetch("https://rajdevsharma.github.io/dogecode/game/CaffeineFueled.zip");
      const zipBinary = await zipResponse.arrayBuffer();
      pyodide.unpackArchive(zipBinary, "zip", { extractDir: "/lib/python3.12/site-packages/caffeinefueled" });

      // Run Python code
      await pyodide.runPythonAsync(`
        import sys
        sys.path.append('/lib/python3.12/site-packages/caffeinefueled')
        import caffeinefueled.game
        caffeinefueled.game.main()
      `);
    };

    loadGame();
  }, []);

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

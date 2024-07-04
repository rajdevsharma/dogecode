import React, { useEffect } from 'react';


const GameComponent = () => {

  useEffect(() => {
    const loadGame = async () => {
      // Load Pyodide
      const pyodide = await window.loadPyodide();
      await pyodide.loadPackage(["pygame-ce"], { checkIntegrity: false });

      // Set up canvas
      const canvas = document.getElementById("canvas");
      pyodide.canvas.setCanvas2D(canvas);

      // Fetch and unpack game files

      const url = "https://rajdevsharma.github.io/dogecode/game/game.zip";
      const zipResponse = await fetch(url);
      const zipBinary = await zipResponse.arrayBuffer();
      console.log(`zipBinary: ${zipBinary} ${zipBinary.byteLength}`);
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

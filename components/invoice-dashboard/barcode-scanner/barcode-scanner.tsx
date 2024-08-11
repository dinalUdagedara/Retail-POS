import { useStore } from "@/store/state";
import { CameraEnhancer, PlayCallbackInfo } from "dynamsoft-camera-enhancer";
import { TextResult, BarcodeReader } from "dynamsoft-javascript-barcode";
import React from "react";

export interface ScannerProps {
  isActive?: boolean;
  children?: React.ReactNode;
  interval?: number;
  license?: string;
  onInitialized?: (enhancer: CameraEnhancer, reader: BarcodeReader) => void;
  onScanned?: (results: TextResult[]) => void;
  onPlayed?: (playCallbackInfo: PlayCallbackInfo) => void;
  onClosed?: () => void;
}

const BarcodeScanner = (props: ScannerProps): React.ReactElement => {
  const mounted = React.useRef(false);
  const container = React.useRef<HTMLDivElement>(null);
  const enhancer = React.useRef<CameraEnhancer>();
  const reader = React.useRef<BarcodeReader>();
  const interval = React.useRef<any>(null);
  const decoding = React.useRef(false);

  const license: string = process.env.NEXT_PUBLIC_BARCODE_LICENSE || "";
  const engineResourcePath: string =
    process.env.NEXT_PUBLIC_BARCODE_ENGINE_RESOURCE_PATH || "";

    const scannedBarcode = useStore ((state)=> state.barCode)
    const setBarcode = useStore((state)=>state.setbarcode)

  React.useEffect(() => {
    const init = async () => {
      console.log("Initializing Barcode Scanner...");
      try {
        if (!BarcodeReader.isWasmLoaded()) {
          if (props.license) {
            BarcodeReader.license = props.license;
          } else {
            BarcodeReader.license = license;
          }
          BarcodeReader.engineResourcePath = engineResourcePath;
        }
        reader.current = await BarcodeReader.createInstance();
        enhancer.current = await CameraEnhancer.createInstance();
        if (container.current) {
          await enhancer.current.setUIElement(container.current);
        }
        enhancer.current.on("played", (playCallbackInfo: PlayCallbackInfo) => {
          console.log("Camera played:", playCallbackInfo);
          if (props.onPlayed) {
            props.onPlayed(playCallbackInfo);
          }
          startScanning();
        });
        enhancer.current.on("cameraClose", () => {
          console.log("Camera closed");
          if (props.onClosed) {
            props.onClosed();
          }
        });
        enhancer.current.setVideoFit("cover");
        if (props.onInitialized) {
          props.onInitialized(enhancer.current, reader.current);
        }
        toggleCamera();
      } catch (error) {
        console.error("Error initializing Barcode Scanner:", error);
      }
    };

    if (!mounted.current) {
      init();
      mounted.current = true;
    }
  }, []);

  const toggleCamera = () => {
    if (mounted.current) {
      if (props.isActive) {
        console.log("Opening camera...");
        enhancer.current?.open(true);
      } else {
        stopScanning();
        console.log("Closing camera...");
        enhancer.current?.close();
      }
    }
  };

  React.useEffect(() => {
    toggleCamera();
  }, [props.isActive]);

  const startScanning = () => {
    const decode = async () => {
      if (!decoding.current && reader.current && enhancer.current) {
        decoding.current = true;
        try {
          const results = await reader.current.decode(
            enhancer.current.getFrame()
          );
          if (props.onScanned) {
              // Extract the barcode text from the results
          if (results.length > 0) {
            const scannedBarcode = results[0].barcodeText;
            setBarcode(scannedBarcode);
            console.log("scanned Barcode: ", scannedBarcode);
            
            // Save the barcode value to local storage
            localStorage.setItem('scannedBarcode', scannedBarcode);
            stopScanning()
          }
            
          }
        } catch (error) {
          console.error("Error during scanning:", error);
        }
        decoding.current = false;
      }
    };
    if (props.interval) {
      interval.current = setInterval(decode, props.interval);
    } else {
      interval.current = setInterval(decode, 40);
    }
  };

  const stopScanning = () => {
    console.log("Stopping scanning...");
    clearInterval(interval.current);
  };

  return (
    <div
      ref={container}
      className="relative w-full h-screen border-2 border-red-500"
    >
      <div className="dce-video-container absolute inset-0 w-full h-full border-2 border-blue-500"></div>
      {props.children}
    </div>
  );
};

export default BarcodeScanner;

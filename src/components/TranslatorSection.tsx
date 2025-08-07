import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileImage, Copy, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

const TranslatorSection = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target?.result as string);
          setShowResults(false);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Please upload an image file.");
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setShowResults(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTranslate = async () => {
    if (!uploadedImage) {
      toast.error("Please upload an image first.");
      return;
    }
    
    setIsTranslating(true);
    // Simulate translation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTranslating(false);
    setShowResults(true);
    toast.success("Translation completed successfully!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <section id="translator" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-manuscript text-4xl md:text-5xl font-bold text-primary mb-4">
            Brahmi Script Translator
          </h2>
          <p className="font-modern text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an image containing Brahmi script and receive instant translations 
            in Sanskrit and English.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-modern text-xl font-semibold mb-4 text-foreground">
                Upload Image
              </h3>
              
              <div
                className="upload-area"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <FileImage className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-modern text-muted-foreground mb-2">
                  Drag and drop your image here, or click to browse
                </p>
                <p className="font-modern text-sm text-muted-foreground">
                  Supports JPG, PNG, WEBP up to 10MB
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {uploadedImage && (
                <div className="mt-6 animate-fade-in">
                  <img
                    src={uploadedImage}
                    alt="Uploaded manuscript"
                    className="w-full max-h-64 object-contain rounded-lg border border-border"
                  />
                  <Button
                    onClick={handleTranslate}
                    disabled={isTranslating}
                    className="btn-hero w-full mt-4"
                  >
                    {isTranslating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mr-2" />
                        Translate Image
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card>

            {/* Sample Images */}
            <Card className="p-6">
              <h3 className="font-modern text-xl font-semibold mb-4 text-foreground">
                Try Sample Images
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-3">
                  <div className="text-center">
                    <div className="w-full h-16 bg-muted rounded mb-2 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Sample 1</span>
                    </div>
                    <span className="text-xs">Ashoka Edict</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-3">
                  <div className="text-center">
                    <div className="w-full h-16 bg-muted rounded mb-2 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Sample 2</span>
                    </div>
                    <span className="text-xs">Coin Inscription</span>
                  </div>
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {showResults ? (
              <div className="space-y-6 animate-fade-in">
                {/* Detected Characters */}
                <Card className="translation-card">
                  <h3 className="font-modern text-xl font-semibold mb-4 text-foreground">
                    Detected Brahmi Characters
                  </h3>
                  <div className="p-4 bg-muted/50 rounded-lg font-manuscript text-lg">
                    𑀓𑀧𑀺𑀮𑀸𑀯𑀲𑁆𑀢𑀼 𑀧𑀭𑀫𑁆 𑀰𑀸𑀦𑁆𑀢𑀺
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => copyToClipboard("𑀓𑀧𑀺𑀮𑀸𑀯𑀲𑁆𑀢𑀼 𑀧𑀭𑀫𑁆 𑀰𑀸𑀦𑁆𑀢𑀺")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </Card>

                {/* Sanskrit Translation */}
                <Card className="translation-card">
                  <h3 className="font-modern text-xl font-semibold mb-4 text-foreground">
                    Sanskrit Translation
                  </h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-manuscript text-lg mb-2">
                      कपिलावस्तु परम शान्ति
                    </p>
                    <p className="font-modern text-sm text-muted-foreground">
                      Devanagari Script
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => copyToClipboard("कपिलावस्तु परम शान्ति")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </Card>

                {/* English Translation */}
                <Card className="translation-card">
                  <h3 className="font-modern text-xl font-semibold mb-4 text-foreground">
                    English Translation
                  </h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-modern text-lg mb-2">
                      "Kapilavastu, supreme peace"
                    </p>
                    <p className="font-modern text-sm text-muted-foreground">
                      Roman Script
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => copyToClipboard("Kapilavastu, supreme peace")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </Card>

                {/* Download Options */}
                <Card className="p-6">
                  <h3 className="font-modern text-xl font-semibold mb-4 text-foreground">
                    Export Translation
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download TXT
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Image
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center text-muted-foreground">
                  <FileImage className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="font-modern text-lg">
                    Upload an image to see translation results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslatorSection;
import Link from "next/link";

export default function IcarusPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="px-6 lg:px-16 max-w-[1400px] mx-auto py-16">
        <Link href="/research" className="inline-block text-white/50 hover:text-white transition-colors mb-8">
          ← Back
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-extralight text-white font-[family-name:var(--font-iceland)] mb-4">
            Icarus
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-[family-name:var(--font-inter)]">
            Hyperspectral CNN for soil chemistry prediction
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Use hyperspectral drones to predict soil chemistry instantly. This data determines what gets grown, contracted, and turned into industrial materials. The Icarus Model processes drone-captured spectral data to estimate soil composition and is deployed in Enotrium's pipeline to contract farms and optimize cash crop economics.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            <strong>Drone + Hyperspectral Imaging (HSI)</strong> — Remote sensing & verification layer.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Eyes Down. Soil Analytes.
          </h3>
          <p className="text-lg text-white/70 leading-relaxed">
            Autonomous hyperspectral remote sensing & AI verification layer for regenerative agriculture and national-security-grade feedstock assurance.
          </p>
        </section>

        {/* Core Capabilities */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Core Capabilities
          </h2>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-4">
            <li>UAV/drone hyperspectral imaging (400–2500 nm, SWIR focus)</li>
            <li>3D DNN models for contaminant detection (microplastics, heavy metals, PFAS, glyphosate, etc.)</li>
            <li>Phytoremediation mapping & soil health scoring</li>
            <li>Real-time verification for traceable, contaminant-free bio-materials</li>
            <li>Edge/offline deployment for austere environments</li>
            <li>Direct integration with AIP0 (zk-secured provenance) and Bioverge (feedstock qualification)</li>
          </ul>
          <p className="text-lg text-white/70 leading-relaxed">
            See <code className="text-white/50">field_results/</code> for actual drone flight results with ground truth validation (79 samples, MD + DE pilots). Includes real vs predicted scatter plots for N, SOC, moisture, and confusion matrices.
          </p>
        </section>

        {/* Abstract */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Abstract
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            This pipeline converts raw spectral data into actionable soil intelligence.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Instead of sampling soil manually, we:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-4">
            <li>scan entire fields using UAV hyperspectral imaging</li>
            <li>reconstruct chemical and biological properties from spectral signatures</li>
            <li>generate maps that directly inform agricultural and industrial decisions</li>
            <li>track seed residuals for phenotyping genomic data</li>
          </ul>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The output is a layer over land use and input economics.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            Soil chemistry determines crop yield and input costs. By predicting soil conditions at scale, we can contract farms based on expected output, optimize crop selection and downstream material properties, and control downstream material tensile strength.
          </p>
        </section>

        {/* System Architecture */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            System Architecture
          </h2>
          <div className="bg-white/5 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="text-white/70">
{`┌──────────────────────────────┐
│   UAV Drone (HSI Sensor)     │
│ 400–2500 nm Spectral Capture │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Hyperspectral Data Cube      │
│ (x, y, λ) ~ 200+ bands       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 3D CNN Model                 │
│ Spectral-Spatial Learning    │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Soil Prediction Maps         │
│ - DNN: Nutrients (N, C)      │
│ - Contaminants (PFAS, MPs)   │
│ - Moisture / Structure       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Field-Level Decisions        │
│ - Land valuation             │
│ - Crop selection             │
│ - Remediation targeting      │
└──────────────────────────────┘`}
            </pre>
          </div>
        </section>

        {/* Theoretical Framework */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Theoretical Framework
          </h2>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Spectral Signatures of Soil Health Stages
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Soil systems progress through distinct health stages characterized by shifting reflectance patterns across visible, near-infrared (NIR), and short-wave infrared (SWIR) bands. These transitions are particularly evident in regions affected by legacy agrochemicals, heavy metals, PFAs, glyphosate residues, and microbial imbalances.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            HSI captures these stages through high-dimensional reflectance vectors, providing an indirect but reliable measure of chemical and biological activity. Research has demonstrated strong correlations between specific spectral features and soil contaminants, nutrient profiles, and ecological restoration potential.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Microplastics Detection
          </h3>
          <p className="text-lg text-white/70 leading-relaxed">
            Microplastics (MPs, particles &lt;5 mm) are among the fastest-growing and most insidious soil contaminants worldwide. They originate from plastic mulch degradation, biosolids application, tire wear, atmospheric deposition, and irrigation water. Once in soil they alter microbial communities, reduce water retention, impair root growth, and enter the food chain, directly threatening regenerative agriculture and long-term soil health.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mt-4">
            Our 400–2500 nm hyperspectral pipeline is exceptionally well-suited for non-invasive MP detection from UAV platforms. While visible and near-infrared (VNIR, 400–1000 nm) can only provide limited discrimination, the short-wave infrared (SWIR, 1000–2500 nm) region captures the diagnostic overtone and combination absorption bands of synthetic polymers that are absent in natural soil matrices.
          </p>
        </section>

        {/* Mathematical Framework */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Mathematical Framework
          </h2>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            The Hyperspectral Pixel
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            A single pixel in a hyperspectral image is not merely RGB values—it is a complete spectrum spanning hundreds of contiguous wavelength bands.
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            Pixel_HSI = [R_400, R_405, R_410, ..., R_2500]
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Where R_λ denotes reflectance at wavelength λ (in nanometers). Our sensors capture 210 bands at 10 nm intervals, yielding a 210-dimensional vector per pixel.
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-6 text-center font-mono">
            Pixel_HSI = [0.14, 0.15, 0.05, 0.11, 0.18, 0.22, ..., 0.10]
          </div>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            3D Convolution Kernels
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Traditional 2D convolutions process spatial neighborhoods only. Icarus employs 3D kernels that simultaneously convolve across spatial dimensions (height, width) and the spectral dimension. A 3 × 3 × 200 kernel captures local spatial texture while integrating 200 contiguous spectral bands.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Kernel visualization (3 × 3 spatial slice at band b):
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            K_all_b = [[w_0_0_b, w_0_1_b, w_0_2_b], [w_1_0_b, w_1_1_b, w_1_2_b], [w_2_0_b, w_2_1_b, w_2_2_b]]
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Flattened kernel vector:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            w = [w_0, w_1, w_2, ..., w_1799]^T
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            Dimensions: 3 × 3 × 200 = 1800 weights per kernel.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Convolution Operation
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            At each position (x, y, b) in the input cube, we extract a 3D patch and compute the dot product with our learned kernel:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-6 text-center font-mono">
            z_x_y_b = sum_i=0^2 sum_j=0^2 sum_k=0^199 w_i_j_k * x_x+i_y+j_b+k + b
          </div>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Feature Map Generation
          </h3>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            a_l = ReLU(BN(W_l * a_l-1 + b_l))
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            Here * denotes 3D convolution, BN is batch normalization, and a_l is the activation of layer l.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Training Objective
          </h3>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            C = sum_j=0^n_L-1 (a_j_L - y_j)^2
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            Mean squared error between predicted soil chemistry values and laboratory-validated ground truth from portable X-ray fluorescence (pXRF) spectroscopy.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Back-Propagation
          </h3>
          <div className="bg-white/5 p-6 rounded-lg mb-2 text-center font-mono">
            dC/dw_i_j_k_l = dC/dz_l * dz_l/dw_i_j_k_l = delta_l * a_l-1_i_j_k
          </div>
          <div className="bg-white/5 p-6 rounded-lg mb-2 text-center font-mono">
            dC/db_l = delta_l = dC/dz_l
          </div>
          <div className="bg-white/5 p-6 rounded-lg mb-6 text-center font-mono">
            delta_l-1 = (W_l)^T * delta_l * sigma'(z_l-1)
          </div>
        </section>

        {/* Spectral Indices */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Spectral Indices
          </h2>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            NDVI — Normalized Difference Vegetation Index
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Indexes density and health of vegetation. Healthy foliage strongly absorbs red light.
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            NDVI = (R NIR - R Red) / (R NIR + R Red)
          </div>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            NDWI — Normalized Difference Water Index
          </h3>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            NDWI = (R_860 - R_1240) / (R_860 + R_1240)
          </div>
          <p className="text-lg text-white/70 leading-relaxed">
            Higher NDWI values indicate greater surface water content. It also serves as a proxy for electrical conductivity, contaminant transport potential, and redox-sensitive metal mobility.
          </p>
        </section>

        {/* Microplastics Detection */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Microplastics Detection
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Our 400–2500 nm hyperspectral pipeline detects microplastics via SWIR absorption features. Common polymers exhibit distinct C–H, C–O, and C=O vibrational features:
          </p>

          <h4 className="text-xl font-light text-white mb-3 font-[family-name:var(--font-inter)]">
            Polyethylene (PE)
          </h4>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            lambda_PE ≈ 1210 nm (C-H 2nd overtone), 1725-1760 nm (C-H 1st overtone)
          </div>

          <h4 className="text-xl font-light text-white mb-3 font-[family-name:var(--font-inter)]">
            Polypropylene (PP)
          </h4>
          <div className="bg-white/5 p-6 rounded-lg text-center font-mono">
            lambda_PP ≈ 1155-1200 nm, 1700-1735 nm
          </div>
        </section>

        {/* Results */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Real-Field Performance
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            From actual drone flights with pXRF + lab chemistry ground truth (79 samples, MD + DE pilots):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Target</th>
                  <th className="text-center py-3 px-4">R²</th>
                  <th className="text-center py-3 px-4">RMSE</th>
                  <th className="text-center py-3 px-4">Sites</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4"><strong>Nitrogen</strong></td>
                  <td className="text-center py-3 px-4">0.70</td>
                  <td className="text-center py-3 px-4">0.29 %</td>
                  <td className="text-center py-3 px-4">MD + DE</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4"><strong>SOC</strong></td>
                  <td className="text-center py-3 px-4">0.76</td>
                  <td className="text-center py-3 px-4">0.39 %</td>
                  <td className="text-center py-3 px-4">MD + DE</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4"><strong>Moisture</strong></td>
                  <td className="text-center py-3 px-4">0.88</td>
                  <td className="text-center py-3 px-4">3.5 %</td>
                  <td className="text-center py-3 px-4">MD + DE</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4"><strong>Microplastics</strong></td>
                  <td className="text-center py-3 px-4">~0.50 F1</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">DE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Preprocessing Pipeline */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Preprocessing Pipeline
          </h2>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            Preprocess(I) = N(R(S(I)))
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            where S performs dimension validation, R applies spatial resizing, and N implements spectral normalization:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-6 text-center font-mono">
            I_norm(b) = (I(b) - mu_b) / (sigma_b + epsilon)
          </div>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Convolution Operation
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Each pixel in the HSI cube is treated as a high-dimensional reflectance vector r in R^B (typically B ≈ 200 bands). A 3D kernel K of size 3 × 3 × B is convolved across the cube:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-6 text-center font-mono">
            f(i,j) = sum_m=-1^1 sum_n=-1^1 sum_b=1^B I(i+m, j+n, b) * K(m, n, b)
          </div>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Spatial Dropout
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            For a feature map tensor F in R^(h × w × C):
          </p>
          <div className="bg-white/5 p-6 rounded-lg text-center font-mono">
            F_drop(i,j,c) = F(i,j,c) * M_c where M_c ~ Bernoulli(p)
          </div>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Summary and Open Request
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            UAV HSI data from varying flight conditions is volatile to work with, and reliance on multi-source datasets without perfectly standardized calibration certainly doesn't help. Nonetheless the strong empirical performance in simulation suggests a strong correlation worth scaling, indicating that integrating hyperspectral reflectance data into EnotriumAI provides essential insights into soil biology and chemistry for regenerative economics.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            Future work should expand beyond single-drone HSI to incorporate the full spectrum of ground-truth signals identified in the whitepaper (portable XRF, soil microbiome sequencing, IoT sensor arrays). This multi-modal approach, combined with the CNN backbone and zero-knowledge proofs, could enable Enotrium's platform to deliver privacy-preserving, verifiable land valuation and supply-chain transparency at continental scale — turning degraded soil into a self-generating, data-rich economic asset.
          </p>
        </section>

        {/* References */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            References and Results
          </h2>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2">
            <li><a href="https://github.com/EnotriumSyndicate/Hyperspectral-Restruct" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline">GitHub Repository</a></li>
            <li><a href="https://github.com/EnotriumSyndicate/Hyperspectral-Restruct/blob/main/Results.md" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline">Results</a></li>
            <li><a href="https://oar.icrisat.org/13212/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline">ICRISAT Open Access Repository</a></li>
            <li><a href="https://www.sciencedirect.com/science/article/pii/S2949919425000305" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline">ScienceDirect Article</a></li>
            <li><a href="https://zenodo.org/records/8143355" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline">Munsell Soil Color Dataset (Zenodo)</a></li>
          </ul>
        </section>
      </div>
    </main>
  );
}

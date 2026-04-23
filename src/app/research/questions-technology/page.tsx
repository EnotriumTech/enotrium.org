import Link from "next/link";

export default function QuestionsTechnologyPage() {
  return (
    <main className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <aside className="w-64 flex-shrink-0 p-8 border-r border-gray-200">
        <div className="mb-8">
          <div className="text-2xl font-extralight text-gray-900 font-[family-name:var(--font-iceland)]">
            Enotrium
          </div>
        </div>
        <nav className="space-y-4">
          <a href="https://enotrium.org" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-gray-900 transition-colors font-[family-name:var(--font-inter)]">
            enotrium.org
          </a>
          <a href="https://github.com/EnotriumSyndicate" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-gray-900 transition-colors font-[family-name:var(--font-inter)]">
            GitHub
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 px-6 lg:px-16 max-w-[1400px] mx-auto py-16">
        <Link href="/research" className="inline-block text-gray-500 hover:text-gray-900 transition-colors mb-8">
          ← Back
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-extralight text-gray-900 font-[family-name:var(--font-iceland)] mb-4">
            Questions Concerning the Future of Technology
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-[family-name:var(--font-inter)]">
            Technology & Philosophy
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Well into the era of exponential technological change, one cannot help but ask if new technology is the cause of social decline.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Despite progress in technology, everything outside technology seems to have undergone some spiritual and material degradation. Our political institutions are less effective. Our universities are less intellectual. Our doctors ask AI, before asking themselves. Very few AI labs seem to come close to matching the scientific rigor of Bell Labs or the Manhattan Project. People are more reliant on proctoring from LLMs to complete basic tasks.
          </p>
        </section>

        {/* The Ancient Meaning of Technē */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-6 font-[family-name:var(--font-inter)]">
            The Ancient Meaning of Technē
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The ancient meaning of things perhaps can offer some light on the state of technology. The Greek word <em>technikon</em> literally means that which is of <em>technē</em>. <em>Technē</em> is both the skill of the technologist or craftsman as well as the art of mind to bring forth the invention. It is not as boomers would say, "a tool," or as Silicon Valley boomers say, "a product."
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            In Book IV of the <em>Nichomachean Ethics</em> (chaps. 3 and 4), Aristotle describes <em>technē</em> and <em>episteme</em> as revealing different categories of things by a different mode of knowing. <em>Technē</em> reveals whatever is not directly before our sight, what can turn out either way. It is a gathering of matter, say for a house, whereas the final <em>telos</em> is not yet revealed. <em>Technē</em> is not the means, and not the tool. <em>Technē</em> is a bringing forth, and revealing more than it is a pure systematic creating. Technology is the art of creating.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Heidegger says, "Technology comes to presence in the realm where revealing and unconcealment take place, where <em>alethēia</em>, truth, happens."
          </p>
        </section>

        {/* Modern Technology */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-6 font-[family-name:var(--font-inter)]">
            Modern Technology
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Modern technology is slightly different than ancient. It is not a simple revealing. It is rather an unlocking. It is strange to say an agricultural tool like a hoe unlocks the soil or that a windmill unlocks the full power of the air. Yet technology in the world of modern physics does unlock nature in a new way. Mining, hydropower, and nuclear engineering unlock some hidden power or energy source, to then store it up. Quantum chips will allow for a new computing speed and arguably break old constructs.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Technology, in the modern sense, is an interrogation of nature. A discovery of what nature has to convert it into energy. As the ancients knew, how you look at things changes what you find. To the Greeks, <em>technē</em> was the unveiling that brings forth truth and art, like Michelangelo carving away all the marble that according to him was not David. The best engineers and technologists have this instinct for creation. There are computer programmers that actually reveal some unknown thing happening far off in this world, hidden to the rest. These kinds of people are becoming rarer though.
          </p>
        </section>

        {/* The Screen and Social Conditioning */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-6 font-[family-name:var(--font-inter)]">
            The Screen and Social Conditioning
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            All our experience of reality is becoming more and more subdued to the screen. Social networks have become social conditioning networks. Traditional email is a true network.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            I think we are witnessing what C.S. Lewis warned of in <em>The Abolition of Man</em> — "Human Nature will be the last part of nature to surrender to Man." Human nature is surrendering to what a few conditioners have in mind for data extraction. Some men control the moons, others the rare earths, some the world's oil and commodity supplies. But it is the digital technologists who control other men: what they see, hear, and think. Of course if these channels remain decentralized, they cannot be entirely controlled.
          </p>
        </section>

        {/* The Future of Technology */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-6 font-[family-name:var(--font-inter)]">
            The Future of Technology
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            But what will X be in 100 years, what will this technology be in a society where there are no libertarian minded leaders? That is why the crypto community should return to building applications for cryptographic protocols, not just cryptocurrencies. The short lived NFT era is arguably as important as applying cryptographic primitives to currency. The question of digital ownership will at some point shape the world order and decide whether or not man or certain men are in charge.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If technology does not legislate decentralized control inherent in the hardware, it will be used for control. This is already being done by most statist or collectivist governments. America should implement blockchain based voting to prevent fraud. The technologists of this world should use technology to preserve civil liberties and basic freedoms. If technology is not implemented by leaders today who value the ideals of free society, they will surely be used by the men of tomorrow who want a collectivist one, or are at least too blind to read the source code.
          </p>
        </section>

        {/* Enotrium's Purpose */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-6 font-[family-name:var(--font-inter)]">
            Enotrium's Purpose
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Enotrium was created to apply technology to preserving free institutions that respect human dignity and preserve our nation in the image of its founding. This can be done in the first half of the twenty-first century only if we act as self determining individuals, but true Emersonian Americanism is long forgotten.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today, everyone is self determining, in a slightly different way. One can choose anything, where to fly tomorrow, answers to obscure research questions, one's gender, even the eye color of one's future children.
          </p>
        </section>

        {/* The Concrete Always Wins */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-6 font-[family-name:var(--font-inter)]">
            The Concrete Always Wins
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            For better or for worse, but the real matter of things is this: something is and always will be more powerful than man, and that is nature. The best technologists understand that. Oppenheimer started from uranium, if he started from scratch or from some vague principle, he would not have created what he had. I think it is fair to say those who understand physical properties of reality are at an advantage over the rest in creating new technologies. Understanding reality creates the essential framing. Most software applications that start from nowhere, end up nowhere.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Technology that starts from some end, some alteration of reality, based on a real thing, is how the world can be moved. Most foreign hackers who wanted to rig an election were better at programming than people who wanted to create the future of socializing. Nature is concrete, and the concrete always wins.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Technology is in control today. People cannot feel certain emotions without music or social media. We cannot function without it or even think without it. We would be wise to accept, technology, not man, is master of the earth.
          </p>
        </section>
      </div>
    </main>
  );
}

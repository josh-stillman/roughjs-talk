import { useEffect, useRef, useState } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/simple.css';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm';
import 'reveal.js/plugin/highlight/zenburn.css';
import RevealNotes from 'reveal.js/plugin/notes/notes.esm';

import './App.css';
import { AnimatedRectangle } from './Rectangle';

function App() {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      // other config oXptions
      transition: 'slide',
      hash: true,
      // Learn about plugins: https://revealjs.com/plugins/
      plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
    });

    deckRef.current.initialize().then(() => {
      // good place for event handlers and plugin setups
    });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch {
        console.warn('Reveal.js destroy call failed.');
      }
    };
  }, []);

  useEffect(() => {
    const vids = document.querySelectorAll<HTMLVideoElement>('.halfspeed');
    vids.forEach(v => (v.playbackRate = 0.5));
  }, []);

  const FILLS = [
    'hachure',
    'dashed',
    'dots',
    'cross-hatch',
    'zigzag',
    'zigzag-line',
  ];

  const [fillStyle, setFillStyle] = useState(FILLS[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      const current = FILLS.indexOf(fillStyle);
      console.log('new is', FILLS[(current + 1) % FILLS.length]);
      setFillStyle(FILLS[(current + 1) % FILLS.length]);
    }, 5000);

    // const currentSlide = deckRef.current?.getIndices().h;
    // if (currentSlide && currentSlide > 3) {
    //   clearInterval(interval);
    // }

    return () => {
      clearInterval(interval);
    };
  }, [fillStyle, deckRef.current]);

  return (
    // Your presentation is sized based on the width and height of
    // our parent element. Make sure the parent is not 0-height.
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        {/* Intro */}
        <section>
          <AnimatedRectangle
            width={window.innerWidth}
            height={window.innerHeight}
            animationDuration={5000}
            animationDurationFillPercentage={1}
            hachureGap={20}
            fill="grey"
            fillStyle={fillStyle}
            className="svg-background"
          />
          <div className="highlight-text">
            <h3>Rough.js Riders Anthem</h3>
            <p>Animating SVGs with a hand-drawn style</p>
          </div>
        </section>

        <section data-background-image="rough-homepage.png"></section>

        <section>
          <img width="80%" src="shapes-examples.png" />
        </section>

        <section>
          <img src="us-map.png" />
        </section>

        {/* <section
          data-background-iframe="https://pshihn.github.io/rough-playground/squares/"
          data-background-interactive
        /> */}

        {/* <section
          data-background-iframe="https://pshihn.github.io/rough-playground/squares-fall-through/"
          data-background-interactive
        /> */}

        <section
          data-background-iframe="https://pshihn.github.io/rough-playground/skulls/"
          data-background-interactive
        >
          <p className="overlay-text" style={{ background: 'orange' }}>
            Happy Halloween!
          </p>
        </section>

        <section>
          <h3>Ecosystem Tour</h3>
        </section>

        <section
          data-background-video="excalidraw.mov"
          data-background-video-loop="true"
          data-background-video-muted="true"
        >
          <h2 className="overlay-text">Excalidraw</h2>
        </section>

        <section
          data-background-video="roughviz.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        >
          <p className="overlay-text">Roughviz Charts</p>
        </section>

        <section
          data-background-video="rough-fonts.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        ></section>

        <section
          data-background-video="font-awesome.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        ></section>

        <section
          data-background-video="wired-components.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        >
          <p className="overlay-text">Wired Components</p>
        </section>

        <section
          data-background-video="rough-notation.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        ></section>

        <section>
          <h3>How Rough.js Works</h3>
        </section>

        <section>
          <p>Roughness through randomness</p>
          <img src="author-blog/random-rough.png" />
        </section>

        <section
          data-background-video="roughness-demo.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        >
          <p className="overlay-text">Roughness Parameter</p>
        </section>

        <section>
          <p>Bowed lines</p>
          <img src="author-blog/lines-explanation.png" />
          <img width="400px" src="author-blog/hand-line.jpg" />
        </section>

        <section>
          <p>Imperfect Circles</p>
          <img width="500px" src="author-blog/ellipse-handdrawn.jpg" />
          <img width="400px" src="author-blog/ellipse-points.png" />
        </section>

        <section>
          <p>Filling Algorithm</p>
          <img width="500px" src="author-blog/scanline.png" />
          <img width="450px" src="author-blog/fill-rotation.jpg" />
        </section>

        <section>
          <p>Variations on hachure fill</p>
          <img width="80%" src="shapes-examples.png" />
        </section>

        {/* <section>
          <h1>TODO</h1>
          <h3>Why Hand-drawn?</h3>
        </section> */}

        <section>
          <h3>Part II: Animating Rough.js</h3>
        </section>

        {/* <section>
          <h1>TODO</h1>
          <h3>Why I wanted to make this animatable</h3>
        </section>

        <section
          data-background-video="iching-jank.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        >
          <h3 className="overlay-text">Janky AF!</h3>
        </section> */}

        <section>
          <h3>SVG Basics Refresher</h3>
        </section>

        <section>
          <h3>SVG vs Raster</h3>
          <img width="500px" src="svg-vs-raster.jpg" />
          <a
            className="cite"
            target="none"
            href="https://www.ratermanis.com/blog/2017/12/28/vector-vs-raster"
          >
            source
          </a>
        </section>

        <section
          data-background-video="svg-paths.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        >
          {/* <h3>SVG Paths</h3> */}
          {/* <img width="500px" src="svg-vs-raster.jpg" /> */}
          <a
            className="cite-right"
            target="none"
            href="https://www.nan.fyi/svg-paths"
          >
            source
          </a>
        </section>

        <section>
          <h3>How SVG Animations Work</h3>
        </section>

        <section>
          <pre>
            <code data-trim data-noescape data-line-numbers="2">
              {`<svg ...>
  <path class="path" stroke="#000000" ... >
</svg>`}
            </code>
          </pre>
          <img src="svg-animations-explained/svg-animation-1.webp" />
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <p>Adding dashes</p>
          <pre>
            <code data-trim data-noescape data-line-numbers="2">
              {`.path {
  stroke-dasharray: 20;
}`}
            </code>
          </pre>
          <img src="svg-animations-explained/svg-animation-2.webp" />
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <p>Longer dashes</p>
          <pre>
            <code data-trim data-noescape data-line-numbers="2">
              {`.path {
  stroke-dasharray: 100;
}`}
            </code>
          </pre>
          <img src="svg-animations-explained/long-dashes.webp" />
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <p>Offset the dashes, animate offset position</p>
          <pre>
            <code data-trim data-noescape data-line-numbers="3|9">
              {`.path {
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
  animation: dash 5s linear;
}

@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}`}
            </code>
          </pre>
          <img src="svg-animations-explained/svg-animations-3.webp" />
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <ol>
            <li>
              Calculate shape length with JavaScript
              <pre>
                <code data-trim data-noescape data-line-numbers="2">
                  {`var path = document.querySelector('.path');
var length = path.getTotalLength(); // => 1000
`}
                </code>
              </pre>
            </li>
            <li className="fragment fade-up">
              Make a dash equal to the length of the entire shape
              <pre>
                <code data-trim data-noescape data-line-numbers="2">
                  {`.path {
  stroke-dasharray: 1000;
}`}
                </code>
              </pre>
            </li>
            <li className="fragment fade-up">
              Offset the dash so it covers up the entire shape
              <pre>
                <code data-trim data-noescape data-line-numbers="2">
                  {`.path {
  stroke-dashoffset: 1000;
}`}
                </code>
              </pre>
            </li>
            <li className="fragment fade-up">Now the shape is hidden!</li>
          </ol>
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <p>Animate the dash off of the shape to reveal!</p>
          <pre>
            <code data-trim data-noescape data-line-numbers="2|3|9">
              {`.path {
  stroke-dasharray: 1000; // length of shape
  stroke-dashoffset: 1000; // move dash on top of shape
  animation: dash 5s linear forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0; // move dash off of shape
  }
}`}
            </code>
          </pre>
          <img src="svg-animations-explained/svg-animations-4.webp" />
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <p>Staggering with delay</p>
          <pre>
            <code
              style={{ maxHeight: 100 }}
              data-trim
              data-noescape
              data-line-numbers="3|8|13"
            >
              {`#drawable-illustration path:not([fill="none"]) {
  ...
  animation: draw 2s forwards;
}

#drawable-illustration path:nth-child(1) {
  ...
  animation-delay: 0s;
}

#drawable-illustration path:nth-child(2) {
  ...
  animation-delay: 2s;
}`}
            </code>
          </pre>
          <video
            width="400px"
            data-autoplay
            loop
            src="animation-delay-demo.mov"
          />
          <a
            className="cite"
            target="none"
            href="https://blog.logrocket.com/how-to-animate-svg-css-tutorial-examples/"
          >
            source
          </a>
        </section>

        {/* <section>
          <h3>"CSS Reasoning"</h3>
        </section>

        <section>
          <img width="80%" src="css_is_awesome.png" />
        </section> */}

        <section>
          <img src="css-is-weird.png" />
        </section>

        <section>
          <h3>Rough.js's paths are too complex for this kind of animation.</h3>
          <video
            width="400px"
            data-autoplay
            loop
            src="problem-complex-paths.mov"
          />
        </section>

        <section>
          <h3>Forking Rough.js to add animations🍴</h3>
        </section>

        <section>
          <p>Split complex paths on each MOVE command</p>
          <img src="split-paths-code.png" />
        </section>

        <section>
          <p>Before</p>
          <pre>
            <code
              style={{ maxHeight: 200 }}
              data-trim
              data-noescape
              data-line-numbers="4-5|8-9"
            >
              {`<svg width="66" height="30">
<g>
  <path
    d="M0 0 C0 0, 0 0, 0 0 M0 0 C0 0, 0 0, 0 0 ...."
    // one super long path for the outline
  ></path>
  <path
    d="M0.9136009482698242 2.0068773385450207 ..."
    // one super long path for the hachure fill
  ></path>}`}
            </code>
          </pre>
          <p>vs After</p>
          <pre>
            <code
              style={{ maxHeight: 200 }}
              data-trim
              data-noescape
              data-line-numbers="1|4-5|37-38"
            >
              {`<svg width="100%" height="100%">
<g>
  <path
    d="M9.991146819517672 10.01018441913022 ..."
    // lots of paths
    ...
  ></path>
  <path
    d="M9.991146819517672 10.010184419130296 ..."
    ...
  ></path>
  <path
    d="M9.508173631691056 15.60902327884526 ..."
    ...
  ></path>
  <path
    d="M9.508173631691056 15.60902327884526 ..."
    ...
  ></path>
  <path
    d="M9.508173631691056 15.60902327884526 ..."
    ...
  ></path>
  <path
    d="M9.508173631691056 15.60902327884526 ..."
    ...
  ></path>
  <path
    d="M9.508173631691056 15.60902327884526 ..."
    ...
  ></path>
  <path
    d="M9.508173631691056 15.60902327884526 ..."
    ...
  ></path>
  <path
    d="M9.845303239339351 16.219805797497646 ..."
    // one path for each line
    ...
  ></path>
  ...
  </g>
  </svg>`}
            </code>
          </pre>
        </section>

        <section>
          <h4>Rearrange DOM order of paths to match animation order</h4>
          <video
            className="halfspeed"
            data-autoplay
            loop
            src="double-outline.mov"
          />
        </section>

        <section>
          <ol>
            <li>Loop over each path in outline, then in the fill</li>
            <li className="fragment fade-up">
              As before, apply a dash the length of the line to cover it
            </li>
            <li className="fragment fade-up">
              Each line's animation duration is proportionate to its length
              <pre>
                <code
                  data-trim
                  data-noescape
                  data-line-numbers
                  style={{ marginLeft: 0, width: 'fit-content' }}
                >
                  {`const lineDuration = totalDuration * (lineLength / totalLength);`}
                </code>
              </pre>
            </li>
            <li className="fragment fade-up">
              Apply a delay equal to the duration of all prior line animations
              in the group. Keep a running tally of the lines' animation
              durations.
              <pre>
                <code data-trim data-noescape data-line-numbers="2">
                  {`const delay = runningTally;
runningTally += lineDuration;`}
                </code>
              </pre>
            </li>
            <li className="fragment fade-up">
              For a zigzag effect, alternate between positive and negative dash
              offsets.
            </li>
          </ol>
        </section>

        <section>
          <h3>Staggering Animations</h3>
          <ol>
            <li className="fragment fade-up">Animate the outline first </li>
            <li className="fragment fade-up">
              Delay the start of the fill until the outline finishes
            </li>
            <li className="fragment fade-up">
              Add a prop to control the percentage of the animation time given
              to the fill
            </li>
            <li className="fragment fade-up">
              Orchestrate animations for multiple shapes by delaying the start
              of the second shape until the first shape is finished.
            </li>
          </ol>
        </section>
        {/*
        <section>
          <p>Add new animation props</p>
          <img src="new-props-code.png" />
        </section> */}

        <section>
          <h3>The results... 🥁</h3>
        </section>

        <section>
          <h3>hachure</h3>
          <video data-autoplay loop src="hachure.mov" />
        </section>

        <section>
          <h3>zigzag</h3>
          <video data-autoplay loop src="zigzag.mov" />
        </section>

        <section>
          <h3>crosshatch</h3>
          <video data-autoplay loop src="crosshatch.mov" />
        </section>

        <section>
          <h3>dashed</h3>
          <video data-autoplay loop src="dashed.mov" />
        </section>

        <section>
          <h3>dots</h3>
          <video data-autoplay loop src="dots.mov" />
        </section>

        <section>
          <h3>zigzag line</h3>
          <video data-autoplay loop src="zigzag line.mov" />
        </section>

        <section>
          <h3>Forking Open-Source NPM Packages</h3>
        </section>

        <section data-background-image="patch-package.png">
          <p className="overlay-text" style={{ bottom: 47, maxWidth: 400 }}>
            patch-package for very small changes
          </p>
        </section>

        <section>
          <div>
            <p>Better with TypeScript: Forking!🍴</p>
            <img width="100px" src="typescript-logo.png" />
          </div>
          <img width="80%" src="fork-button.webp" />
        </section>

        <section>
          <p>In the forked package.json</p>
          <img width="150px" src="fork-wink.png" />
          <pre>
            <code data-trim data-noescape data-line-numbers="3">
              {`"scripts": {
    "build": "rm -rf bin && tsc && rollup -c",
    "prepare": "npm run build",
    ...
  }
`}
            </code>
          </pre>
        </section>

        <section>
          <p>Consuming the fork from GitHub</p>
          <img width="200px" src="consume-fork.jpg" />
          <pre>
            <code data-trim data-noescape data-line-numbers="2">
              {`"dependencies": {
  "rough-animated": "josh-stillman/rough-animated#js/animate"
  ...
}
`}
            </code>
          </pre>
        </section>

        <section>
          <h3>Using rough-animated in another project</h3>
          <video data-autoplay loop src="i-ching-animated.mov" />
        </section>

        <section>
          <h3>Stirring Conclusion</h3>
        </section>

        <section>
          <h3>Shamless Plug: Lintier</h3>
          <img src="lintier.gif" />
          <a
            className="cite"
            target="none"
            href="https://github.com/josh-stillman/lintier"
          >
            source
          </a>
        </section>

        <section>
          <h1>PSA: VOTE!! 🇺🇸</h1>
          <h3>
            NY registration deadline is in <b>TWO DAYS</b> - 10/26!!
          </h3>
          <h3>
            You can register{' '}
            <a
              style={{ textDecoration: 'underline' }}
              href="https://elections.ny.gov/voter-registration-process"
              target="blank"
            >
              online!
            </a>
          </h3>
        </section>
      </div>
    </div>
  );
}

export default App;

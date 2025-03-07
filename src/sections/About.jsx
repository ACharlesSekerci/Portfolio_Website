import { useState } from 'react';
import Globe from 'react-globe.gl';

import Button from '../components/Button.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(' met.sekerci@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Hi, I'm Ahmet C Sekerci</p>
              <p className="grid-subtext">
                Over 4 years of experience in software testing and automation with a strong background in software development. 
                Proficient in Java, Python, and related technologies with a proven record of reducing test cycle times and 
                increasing automation coverage in both web and desktop applications.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/testtools.png" alt="test-tools" className="w-full sm:h-[276px] h-fit object-cover object-center" />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                • Languages: Java, Kotlin, Python, SQL, HTML, Gherkin<br/>
                • Tools: Selenium, Postman, REST Assured, JUnit, TestNG, Cucumber<br/>
                • Desktop Automation: Pywinauto, Ronarex<br/>
                • IDEs: IntelliJ, Android Studio, PyCharm, Cursor<br/>
                • CI/CD: Jenkins, Git, GitHub, Jira
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 40.7128, lng: -74.0060, text: 'Rutherford, New Jersey', color: 'white', size: 15 }]}
              />
            </div>
            <div>
              <p className="grid-headtext">Based in New Jersey, USA</p>
              <p className="grid-subtext">I&apos;m located in Rutherford, New Jersey and open to remote and on-site opportunities in the NYC metro area.</p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Education</p>
              <p className="grid-subtext">
                <strong>Montclair University (2024–2026)</strong><br/>
                Master's in Computer Science<br/><br/>
                I'm passionate about advancing my knowledge in software development and testing methodologies. I love solving complex problems through code and continuously improving my technical skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">met.sekerci@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

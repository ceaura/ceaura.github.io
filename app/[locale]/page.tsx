import "./page.scss";
import Image from "next/image";
import { join } from "path";
import { lazy } from "react";
import { readFile } from "fs/promises";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";

import type { SkillAttributes } from "@/interfaces/Skill";
import type { ProjectAttributes } from "@/interfaces/Project";

import Genio from "@/images/genio.png";
import Domego from "@/images/domego.png";
import Homepage from "@/images/homepage.png";
import Portfolio from "@/images/portfolio.png";
import GamesOnWeb from "@/images/gamesonweb2023.png";
import Assignment from "@/images/assignment.png";
import FileStorage from "@/images/filestorage.png";
import SourceConsole from "@/images/sourceconsole.png";
import MangaParadise from "@/images/mangaparadise.png";
import PlatformerUnity from "@/images/platformerunity.png";
import DigitalIdentity from "@/images/digitalidentity.png";
import SpaceShooter from "@/images/spaceshooter.png";
import Voyo from "@/images/voyo.png";
import FacepunchMonitor from "@/images/facepunchmonitor.png";

import { generateMetadata } from "./layout";

const SkillFilter = lazy(() => import("./components/skill-filter"));
const ContactMailer = lazy(() => import("./components/contact-mailer"));

const directory = join(process.cwd(), "data");
const getProjects = async () => JSON.parse(
  await readFile(`${directory}/projects.json`, "utf8")
) as ProjectAttributes[];

const getSkills = async () => JSON.parse(
  await readFile(`${directory}/skills.json`, "utf8")
) as SkillAttributes[];

const getImage = (name: string) => {
  switch (name) {
    case "genio":
      return Genio;
    case "domego":
      return Domego;
    case "homepage":
      return Homepage;
    case "portfolio":
      return Portfolio;
    case "gamesonweb2023":
      return GamesOnWeb;
    case "assignment":
      return Assignment;
    case "filestorage":
      return FileStorage;
    case "sourceconsole":
      return SourceConsole;
    case "mangaparadise":
      return MangaParadise;
    case "platformerunity":
      return PlatformerUnity;
    case "digitalidentity":
      return DigitalIdentity;
    case "spaceshooter":
      return SpaceShooter;
    case "voyo":
      return Voyo;
    case "facepunchmonitor":
      return FacepunchMonitor;
    default:
      return "";
  }
};

export default async function Page({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const github = (await generateMetadata()).source;
  const date = new Date();

  date.setTime(date.getTime() - Date.parse("08 Aug 1999 00:00:00 GMT"));

  return (
    <main>
      <a
        rel="noopener noreferrer"
        href={github}
        target="_blank"
        aria-label="GitHub"
      >
        <svg width="80" height="80" viewBox="0 0 250 250">
          <path d="M0 0l115 115h15l12 27 108 108V0z" />
          <path d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16" />
          <path
            d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0
            5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41
            2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"
          />
        </svg>
      </a>

      <section>
        <h1>
          {t("landing.hello_title")}
          <span>{t("landing.developer_firstname")}</span>
          <span>{t("landing.developer_surname")}.</span>
        </h1>

        <article id="about">
          <p>
            {t("landing.developer_description", {
              age: date.getFullYear() - 1970
            })}
          </p>

          <a
            rel="noopener noreferrer"
            href="https://drive.google.com/file/d/18Z_OUsALC393t8oVAS3BIxcYP8GzbGrp/view"
            target="_blank"
          >
            <button type="button">{t("landing.download_resume")}</button>
          </a>
        </article>
      </section>

      <section id="projects">
        <h2>{t("landing.header_projects")}</h2>

        <ul>
          {Object.entries(await getProjects()).map(([key, value]) => (
            <li key={key}>
              <Image
                src={getImage(key)}
                alt={value.title}
                width={450}
                height={375}
                placeholder="blur"
              />

              <div>
                <h3>{value.title}</h3>
                <p>{t(`projects.${key}`)}</p>
                <ul>
                  {value.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
                <ul>
                  {value.repository && (
                    <li>
                      <a
                        rel="noopener noreferrer"
                        href={value.repository}
                        target="_blank"
                        aria-label={t("landing.project_source")}
                      >
                        <FontAwesomeIcon icon={faCode} />
                      </a>
                    </li>
                  )}
                  {value.demo && (
                    <li>
                      <a
                        rel="noopener noreferrer"
                        href={value.demo}
                        target="_blank"
                        aria-label={t("landing.project_demo")}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <SkillFilter skills={await getSkills()} />
      <ContactMailer />
    </main>
  );
}

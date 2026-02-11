const chk = `<img src="assets/icons/jts_checked.png" class="app-icon" width="10">`;

export const app_data = {
  a_dtls: {
    title: "Application Version",
    version: "v1.0.0",
    languages: "English (only)",
    compatibility: "Windows desktop",
    format:
      ".exe — Windows executable files are the standard format for applications and installers on Microsoft Windows.",
  },
  dscrptn: {
    title: "Description",
    text: "Jets_Torrent is a simple and straightforward torrent downloading application. It supports both .torrent files and an in‑app torrent search. The app is primarily designed for downloading movies, but with .torrent files you can attempt to download other types of content. Keep in mind that non‑movie downloads may not always work smoothly.",
  },
  bnfts: {
    title: "Benefits",
    text: "Jets_Torrent emphasizes privacy, safety, and ease of use. It contains no advertisements, does not require third‑party installations, and avoids malicious code execution. The application does not expose personal user information to external access. It only uses what is strictly necessary: your IP address for downloading, the designated download folder for file storage, and your internet connection for transfers. This makes torrent downloading secure, private, and straightforward.",
  },
  a_mngnt: {
    title: "Application Management",
    text: "To ensure the app works effectively, Jets_Torrent uses ports 8100, 8101, and 8102 for offline app data transfer, management, and accessibility. If the app fails to run because one of these ports is occupied, close the conflicting service. These ports are rarely used unless another application is specifically designed to use them. The app also requires access to the download folder for saving files and internet connection for downloading torrents.",
  },
  bgs: {
    title: "Bugs",
    text: "Simplicity can sometimes be challenging to achieve. The application may contain minor bugs, but these do not affect core functionality such as downloading. Future updates will address these issues. If you encounter a problem, submit a bug report — once reviewed, fixes will be included in upcoming releases.",
  },
  rvw: {
    title: "Review",
    text: "Jets_Torrent was a fun and straightforward project to build, though it required significant coding effort and management. If you enjoy using the app, you can show your appreciation by leaving a review in the review section.",
  },
};
export const app_data_terms = {
  a: {
    title: "Responsibility  ",
    dscrptn:
      "This application has be inspected and designed to work as intended, as such you assume full responsibility for the use of this program. The author of Jets_Torrent is not liable for damages caused by it, as the issue may be beyond the scope of this app's usage, functionality and accessibility.",
  },

  b: {
    title: "System Usage  ",
    dscrptn:
      "The application only uses your computer resources for downloading, specifically ports 8100, 8101, and 8102, as well as internet access.",
  },

  c: {
    title: "Third‑Party Connections ",
    dscrptn:
      "No third‑party access is granted beyond the direct connection between your computer and torrent seeders. Seeders are other users or computers sharing the files you are downloading.",
  },

  d: {
    title: "Torrent Activity ",
    dscrptn:
      "All activities within Jets_Torrent are torrent‑based. If you are unfamiliar with torrent downloading, you should research how torrents work before using this application.",
  },
};
export const app_data_privacy = {
  title: "Privacy Policy",
  sub_title: "Jets_Torrent is designed with user privacy in mind:",
  text_1:
    "The application does not collect or expose personal user information to external parties.",
  text_2:
    "No third‑party applications or services are installed or required (except for seeders).",
  text_3: "No malicious code is executed or installed through Jets_Torrent.",
  text_4: {
    text_4_0:
      "The only information accessed is what is necessary for functionality:",
    text_4_1: "Your computer (for torrent connections)",
    text_4_2: "Your designated download folder (for saving files)",
    text_4_3: "Your internet connection (for downloading content)",
  },
};
export const app_vrsn_data = [
  {
    app_nm_v: "Jets_torrent - v0.0.6",
    app_path: "app_assets/app_versions/old_version",
    app_size: "150mb",
    version_date: "Thursday, 15 January 2026 - 1:00pm",
    fix_1: "fixed dark mode (download & search screen)",
    vrsn_id: "1",
    chk,
  },
  {
    app_nm_v: "Jets_torrent - v0.0.9",
    app_path: "app_assets/app_versions/old_version",
    app_size: "150mb",
    version_date: "Saturday, 17 January 2026 - 5:00pm",
    fix_1: "Updated terms of use",
    vrsn_id: "2",
    chk,
  },
  {
    app_nm_v: "Jets_torrent - v1.0.0",
    app_path: "app_assets/app_versions/current_version",
    app_size: "150mb",
    version_date: "Sunday, 18 January 2026 - 11:00am",
    fix_1: "fixed third resume download failing",
    vrsn_id: "3",
    chk,
  },
];

import axios from 'axios';

export interface InstalledExtension {
    identifier: string,
    version: string
}
  
export interface RemoteExtension extends InstalledExtension {
    name: string,
    description: string,
}

export async function getInstalledAddonList(): Promise<InstalledExtension[]> {
    return (await (await fetch("http://localhost:64733/addonList")).json()).addons;
}

const GITHUB_REPO_API_URL = 'https://api.github.com/repos/Rubyboat1207/cumulohost/contents/';
export const GITHUB_RAW_CONTENT_URL = 'https://raw.githubusercontent.com/Rubyboat1207/cumulohost/main/';

function fetchGitHubContent(path: string = ''): Promise<any> {
  // Fetch new data and update cache
  return axios.get(`${GITHUB_REPO_API_URL}${path}?${Math.random()}`)
    .then(response => {
      localStorage.setItem(path, JSON.stringify(response.data));
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching GitHub content:', error);
      throw error;
    });
}

function fetchRawGitHubContent(path: string = ''): Promise<any> {
    // Fetch new data and update cache
    return axios.get(`${GITHUB_RAW_CONTENT_URL}${path}?${Math.random()}`)
      .then(response => {
        localStorage.setItem(path, JSON.stringify(response.data));
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching GitHub raw content:', error);
        throw error;
      });
  }
  

export function listRemoteAddons(): Promise<string[]> {
  return fetchGitHubContent()
    .then(rootContents => 
      rootContents
        .filter((item: any) => item.type === 'dir')
        .map((dir: any) => dir.name)
    );
}

export function getManifest(addon: string): Promise<any> {
    return fetchRawGitHubContent(`${addon}/manifest.json`);
  }
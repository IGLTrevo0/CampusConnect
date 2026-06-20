export function getGithubUsername(url){
    if(!url) return null;

    const match = url.match(/github\.com\/([^/]+)/);

    return match? match[1]:null;
}
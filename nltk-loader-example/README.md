# NLTK Loader Example

All commands should be run in the `nltk-loader-example` directory.

* Build: `docker build -t rig-docker .`
* Run: `docker run -d -p 8888:8888 -v /home/jvdzwaan/code/Rig/nltk-loader-example:/home/jovyan/work -v /home/jvdzwaan/data/enron-seq:/data --name rig rig-docker start-notebook.sh` (Please provide proper directory mappings)
  * Open the notebook server at http://localhost:8888/
